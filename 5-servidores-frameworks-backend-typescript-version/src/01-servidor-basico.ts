import http from 'http';

// Crear un servidor HTTP básico
const server = http.createServer((req, res) => {
  // req: información de la petición del cliente
  // res: objeto para enviar respuestas al cliente

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('¡Hola desde Node.js!');
});

// Puerto en el que el servidor escuchará
const PORT = 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log('Presiona Ctrl+C para detener el servidor');
});
