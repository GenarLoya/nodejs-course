import express from 'express';

// Crear la aplicación Express
const app = express();

// Middleware para parsear JSON en el body
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

// Ruta que devuelve HTML
app.get('/pagina', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Express.js</title>
      </head>
      <body>
        <h1>🚀 Servidor con Express.js</h1>
        <p>Express facilita enormemente el desarrollo de APIs</p>
      </body>
    </html>
  `);
});

// Ruta que devuelve JSON
app.get('/api/usuarios', (req, res) => {
  const usuarios = [
    { id: 1, nombre: 'Ana García', email: 'ana@ejemplo.com' },
    { id: 2, nombre: 'Luis Pérez', email: 'luis@ejemplo.com' },
    { id: 3, nombre: 'María López', email: 'maria@ejemplo.com' },
  ];

  res.json({
    success: true,
    data: usuarios,
    total: usuarios.length,
  });
});

// Ruta con información del servidor
app.get('/api/info', (req, res) => {
  res.json({
    framework: 'Express.js',
    nodeVersion: process.version,
    plataforma: process.platform,
    fecha: new Date().toISOString(),
  });
});

// Puerto en el que escuchará el servidor
const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
  console.log('\nRutas disponibles:');
  console.log(`  - http://localhost:${PORT}/`);
  console.log(`  - http://localhost:${PORT}/pagina`);
  console.log(`  - http://localhost:${PORT}/api/usuarios`);
  console.log(`  - http://localhost:${PORT}/api/info`);
  console.log('\nPresiona Ctrl+C para detener el servidor');
});
