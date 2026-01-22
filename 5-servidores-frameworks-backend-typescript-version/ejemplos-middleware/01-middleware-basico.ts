import express from 'express';

const app = express();

// ============================================
// 1. MIDDLEWARE BÁSICO
// ============================================

// Middleware simple que se ejecuta en cada petición
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // IMPORTANTE: llamar next() para continuar al siguiente middleware
});

// ============================================
// 2. MIDDLEWARE QUE MODIFICA EL REQUEST
// ============================================

// Agregar una propiedad personalizada al request
app.use((req, res, next) => {
  (req as any).horaLlegada = new Date();
  next();
});

// ============================================
// 3. RUTAS
// ============================================

app.get('/', (req, res) => {
  const horaLlegada = (req as any).horaLlegada;
  res.json({
    mensaje: '¡Hola! Los middlewares se ejecutaron antes de llegar aquí',
    horaLlegada: horaLlegada.toISOString(),
  });
});

app.get('/saludo', (req, res) => {
  res.json({
    mensaje: 'Este endpoint también pasó por los middlewares',
  });
});

// ============================================
// 4. MIDDLEWARE ESPECÍFICO PARA UNA RUTA
// ============================================

// Este middleware solo se ejecuta para /privado
const verificarAcceso = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('🔒 Verificando acceso...');
  const tieneAcceso = true; // Simulación

  if (tieneAcceso) {
    console.log('✅ Acceso concedido');
    next();
  } else {
    console.log('❌ Acceso denegado');
    res.status(403).json({ error: 'No tienes acceso' });
  }
};

app.get('/privado', verificarAcceso, (req, res) => {
  res.json({ mensaje: 'Contenido privado - pasaste la verificación' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log('\n📝 Conceptos de middleware:');
  console.log('  1. Los middlewares se ejecutan en orden');
  console.log('  2. Debes llamar next() para continuar');
  console.log('  3. Pueden modificar req y res');
  console.log('  4. Pueden terminar la petición sin llamar next()');
  console.log('\n🔍 Observa la consola al hacer peticiones');
});
