import express from 'express';

const app = express();
app.use(express.json());

// Base de datos simulada en memoria
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

let usuarios: Usuario[] = [
  { id: 1, nombre: 'Ana García', email: 'ana@ejemplo.com', activo: true },
  { id: 2, nombre: 'Luis Pérez', email: 'luis@ejemplo.com', activo: true },
  { id: 3, nombre: 'María López', email: 'maria@ejemplo.com', activo: false },
];

let siguienteId = 4;

// GET - Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.json({
    success: true,
    data: usuarios,
    total: usuarios.length,
  });
});

// GET - Obtener un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado',
    });
  }

  res.json({
    success: true,
    data: usuario,
  });
});

// POST - Crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email, activo } = req.body;

  // Validación básica
  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      error: 'nombre y email son requeridos',
    });
  }

  const nuevoUsuario: Usuario = {
    id: siguienteId++,
    nombre,
    email,
    activo: activo ?? true,
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    success: true,
    message: 'Usuario creado exitosamente',
    data: nuevoUsuario,
  });
});

// PUT - Actualizar un usuario completamente
app.put('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, email, activo } = req.body;

  const indice = usuarios.findIndex(u => u.id === id);

  if (indice === -1) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado',
    });
  }

  // Validación
  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      error: 'nombre y email son requeridos',
    });
  }

  // Reemplazar usuario completo
  usuarios[indice] = {
    id,
    nombre,
    email,
    activo: activo ?? true,
  };

  res.json({
    success: true,
    message: 'Usuario actualizado exitosamente',
    data: usuarios[indice],
  });
});

// PATCH - Actualizar parcialmente un usuario
app.patch('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const actualizaciones = req.body;

  const indice = usuarios.findIndex(u => u.id === id);

  if (indice === -1) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado',
    });
  }

  // Actualizar solo los campos proporcionados
  usuarios[indice] = {
    ...usuarios[indice],
    ...actualizaciones,
    id, // Asegurar que el ID no cambie
  };

  res.json({
    success: true,
    message: 'Usuario actualizado parcialmente',
    data: usuarios[indice],
  });
});

// DELETE - Eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = usuarios.findIndex(u => u.id === id);

  if (indice === -1) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado',
    });
  }

  const usuarioEliminado = usuarios[indice];
  usuarios.splice(indice, 1);

  res.json({
    success: true,
    message: 'Usuario eliminado exitosamente',
    data: usuarioEliminado,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log('\nEndpoints disponibles:');
  console.log('  GET    /api/usuarios        - Listar todos');
  console.log('  GET    /api/usuarios/:id    - Obtener uno');
  console.log('  POST   /api/usuarios        - Crear nuevo');
  console.log('  PUT    /api/usuarios/:id    - Actualizar completo');
  console.log('  PATCH  /api/usuarios/:id    - Actualizar parcial');
  console.log('  DELETE /api/usuarios/:id    - Eliminar');
  console.log('\n💡 Usa Postman o Thunder Client para probar');
});
