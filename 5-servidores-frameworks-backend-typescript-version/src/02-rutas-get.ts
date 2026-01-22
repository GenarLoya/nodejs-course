import http from 'http';

// Base de datos simulada en memoria
const usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana@ejemplo.com' },
  { id: 2, nombre: 'Luis Pérez', email: 'luis@ejemplo.com' },
  { id: 3, nombre: 'María López', email: 'maria@ejemplo.com' },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Ruta principal - HTML
  if (method === 'GET' && url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Servidor HTTP Node.js</title>
        </head>
        <body>
          <h1>🚀 Servidor HTTP con Node.js</h1>
          <p>Rutas disponibles:</p>
          <ul>
            <li><a href="/">/</a> - Página principal</li>
            <li><a href="/api/usuarios">/api/usuarios</a> - Lista de usuarios (JSON)</li>
            <li><a href="/api/info">/api/info</a> - Información del servidor</li>
          </ul>
        </body>
      </html>
    `);
  }
  // Ruta API usuarios - JSON
  else if (method === 'GET' && url === '/api/usuarios') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      success: true,
      data: usuarios,
      total: usuarios.length,
    }));
  }
  // Ruta API info - JSON
  else if (method === 'GET' && url === '/api/info') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      servidor: 'Node.js HTTP',
      version: process.version,
      plataforma: process.platform,
      fecha: new Date().toISOString(),
    }));
  }
  // Ruta no encontrada - 404
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('❌ 404 - Ruta no encontrada');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log('\nRutas disponibles:');
  console.log(`  - http://localhost:${PORT}/`);
  console.log(`  - http://localhost:${PORT}/api/usuarios`);
  console.log(`  - http://localhost:${PORT}/api/info`);
  console.log('\nPresiona Ctrl+C para detener el servidor');
});
