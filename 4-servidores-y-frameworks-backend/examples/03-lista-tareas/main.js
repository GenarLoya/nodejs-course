require("dotenv").config({ quiet: true });
const express = require("express");
const { z, ZodError } = require("zod");
const db = require("./sqlite");

const app = express();
app.use(express.json());

/* =========================
   Schemas Zod
========================= */

// Crear TODO
const createTodoSchema = z.object({
  title: z.string().min(1),
});

// Params ID
const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Actualizar TODO
const updateTodoSchema = z.object({
  title: z.string().min(1).optional(),
  completed: z.boolean().optional(),
});

/* =========================
   Rutas
========================= */

// 📥 Obtener todos
app.get("/todos", (req, res) => {
  const todos = db.prepare("SELECT * FROM todos").all();
  res.json(todos);
});

// ➕ Crear TODO
app.post("/todos", (req, res) => {
  const data = createTodoSchema.parse(req.body);

  const result = db
    .prepare("INSERT INTO todos (title) VALUES (?)")
    .run(data.title);

  res.status(201).json({
    id: result.lastInsertRowid,
    title: data.title,
    completed: false,
  });
});

// ✏️ Actualizar TODO
app.patch("/todos/:id", (req, res) => {
  const { id } = idSchema.parse(req.params);
  const data = updateTodoSchema.parse(req.body);

  const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
  if (!todo) {
    return res.status(404).json({ message: "Todo no encontrado" });
  }

  const newTitle = data.title ?? todo.title;
  const newCompleted =
    data.completed !== undefined ? Number(data.completed) : todo.completed;

  db.prepare("UPDATE todos SET title = ?, completed = ? WHERE id = ?").run(
    newTitle,
    newCompleted,
    id,
  );

  res.json({ id, title: newTitle, completed: Boolean(newCompleted) });
});

// 🗑️ Borrar TODO
app.delete("/todos/:id", (req, res) => {
  const { id } = idSchema.parse(req.params);

  const result = db.prepare("DELETE FROM todos WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Todo no encontrado" });
  }

  res.status(204).send();
});

/* =========================
   Errores Zod
========================= */
app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationError",
      details: err.issues,
    });
  }
  console.error(err);
  res.status(500).json({ error: "Internal error" });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 API TODO corriendo en http://localhost:${process.env.PORT}`);
});
