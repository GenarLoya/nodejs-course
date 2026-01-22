import express from "express";

const app = express();

// Middleware para parsear JSON en el body
app.use(express.json());

// Base de datos simulada
interface Articulo {
  id: number;
  titulo: string;
  contenido: string;
  autor: string;
  fechaCreacion: string;
}

let articulos: Articulo[] = [
  {
    id: 1,
    titulo: "Introducción a Node.js",
    contenido: "Node.js es un entorno de ejecución para JavaScript...",
    autor: "Ana García",
    fechaCreacion: "2024-01-15",
  },
  {
    id: 2,
    titulo: "Guía de Express.js",
    contenido: "Express es el framework más popular para Node.js...",
    autor: "Luis Pérez",
    fechaCreacion: "2024-01-20",
  },
];

let siguienteId = 3;

// GET - Listar todos los artículos
app.get("/api/articulos", (req, res) => {
  res.json({
    success: true,
    data: articulos,
    total: articulos.length,
  });
});

// POST - Crear un nuevo artículo
// Esperamos recibir: { titulo, contenido, autor }
app.post("/api/articulos", (req, res) => {
  const { titulo, contenido, autor } = req.body;

  // Validación básica
  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "El título es requerido",
    });
  }

  if (!contenido || contenido.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "El contenido es requerido",
    });
  }

  if (!autor || autor.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "El autor es requerido",
    });
  }

  // Crear el nuevo artículo
  const nuevoArticulo: Articulo = {
    id: siguienteId++,
    titulo: titulo.trim(),
    contenido: contenido.trim(),
    autor: autor.trim(),
    fechaCreacion: new Date().toISOString(),
  };

  articulos.push(nuevoArticulo);

  res.status(201).json({
    success: true,
    message: "Artículo creado exitosamente",
    data: nuevoArticulo,
  });
});

// PUT - Actualizar un artículo completo
app.put("/api/articulos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, contenido, autor } = req.body;

  const indice = articulos.findIndex((a) => a.id === id);

  if (indice === -1) {
    return res.status(404).json({
      success: false,
      error: "Artículo no encontrado",
    });
  }

  // Validación
  if (!titulo || !contenido || !autor) {
    return res.status(400).json({
      success: false,
      error: "titulo, contenido y autor son requeridos",
    });
  }

  // Actualizar el artículo completo
  articulos[indice] = {
    id,
    titulo: titulo.trim(),
    contenido: contenido.trim(),
    autor: autor.trim(),
    fechaCreacion: articulos[indice]?.fechaCreacion ?? new Date().toISOString(),
  };

  res.json({
    success: true,
    message: "Artículo actualizado exitosamente",
    data: articulos[indice],
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log("\nEndpoints disponibles:");
  console.log("  GET  /api/articulos     - Listar todos");
  console.log("  POST /api/articulos     - Crear artículo");
  console.log("  PUT  /api/articulos/:id - Actualizar completo");
  console.log("\n💡 Ejemplo de JSON para POST:");
  console.log(
    JSON.stringify(
      {
        titulo: "Mi artículo",
        contenido: "Contenido del artículo...",
        autor: "Juan Pérez",
      },
      null,
      2,
    ),
  );
});
