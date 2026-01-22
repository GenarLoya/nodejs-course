const express = require("express");

const app = express();
const port = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Lista en memoria de animales
let animales = [];

// Ruta para listar todos los animales
app.get("/animales", (req, res) => {
  return res.json(animales);
});

// Ruta para agregar un nuevo animal
app.post("/animales", (req, res) => {
  const { nombre, especie } = req.body;
  if (!nombre || !especie) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  const id = animales.length + 1;
  const animal = { id, nombre, especie };
  animales.push(animal);
  return res.status(201).json(animal);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
