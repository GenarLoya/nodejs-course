const express = require("express");
const { z, ZodError, coerce } = require("zod");

const app = express();
const port = 3001;

app.use(express.json());

// Error HTTP personalizado
class HttpError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

// Lista inmutable de alumnos (no se pueden agregar o eliminar alumnos)
const alumnos = Object.freeze([
  { id: 1, nombre: "Ana Pérez", calificaciones: [] },
  { id: 2, nombre: "Luis García", calificaciones: [] },
  { id: 3, nombre: "María López", calificaciones: [] },
]);

/*
  Schemas con Zod
*/
// Param `id` en rutas: acepta strings (de params) que se convierten a número entero positivo
const paramsIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Payload para la calificación: materia (string) y calificacion (número 0-10)
const calificacionSchema = z.object({
  materia: z.string(),
  calificacion: z.number().min(0).max(10),
});

// Helper: obtener alumno por id o lanzar HttpError
function getAlumnoByIdRaw(idNum) {
  const alumno = alumnos.find((a) => a.id === idNum);
  if (!alumno) {
    throw new HttpError("Alumno no encontrado", 404);
  }
  return alumno;
}

// Rutas

// Listar alumnos (devolvemos copias superficiales para no exponer referencias directas)
app.get("/alumnos", (req, res) => {
  const copia = alumnos.map(({ id, nombre, calificaciones }) => ({
    id,
    nombre,
    calificaciones,
  }));
  return res.json(copia);
});

// Obtener alumno por id
app.get("/alumnos/:id", (req, res, next) => {
  try {
    const parsed = paramsIdSchema.parse(req.params);
    const alumno = getAlumnoByIdRaw(parsed.id);
    return res.json({
      id: alumno.id,
      nombre: alumno.nombre,
      calificaciones: alumno.calificaciones,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

// PATCH para agregar/sobrescribir calificación por materia.
// Si la materia no existe se crea; si ya existe se sobrescribe.
app.patch("/alumnos/:id/calificaciones", (req, res, next) => {
  try {
    const { id } = paramsIdSchema.parse(req.params);
    const payload = calificacionSchema.parse(req.body);

    const alumno = getAlumnoByIdRaw(id);

    // Buscar por materia (case-insensitive)
    const materiaLower = payload.materia.toLowerCase();
    const idx = alumno.calificaciones.findIndex(
      (c) => c.materia.toLowerCase() === materiaLower,
    );

    if (idx === -1) {
      // Crear nueva calificación
      alumno.calificaciones.push({
        materia: payload.materia,
        calificacion: payload.calificacion,
      });
    } else {
      // Sobrescribir la existente
      alumno.calificaciones[idx] = {
        materia: payload.materia,
        calificacion: payload.calificacion,
      };
    }

    return res.json(alumno.calificaciones);
  } catch (err) {
    return next(err);
  }
});

// Middleware de manejo de errores (captura ZodError y HttpError)
app.use((err, req, res, next) => {
  if (!err) return next();

  // ZodError -> 400 con detalles
  if (err instanceof ZodError) {
    const detalles = err.issues;
    return res
      .status(400)
      .json({ error: "ValidationError", message: detalles });
  }

  // HttpError con status conocido
  if (err instanceof HttpError) {
    const status = Number.isInteger(err.status) ? err.status : 400;
    return res.status(status).json({ error: err.name, message: err.message });
  }

  // Error inesperado
  console.error(err);
  return res
    .status(500)
    .json({ error: "InternalError", message: "Error interno del servidor" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`API de alumnos corriendo en http://localhost:${port}`);
});
