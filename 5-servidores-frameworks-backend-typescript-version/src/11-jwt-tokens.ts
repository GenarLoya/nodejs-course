import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ============================================
// CONFIGURACIÓN
// ============================================

const CLAVE_SECRETA = process.env.CLAVE_SECRETA;

if (!CLAVE_SECRETA) {
  console.error("❌ La variable CLAVE_SECRETA no está definida en .env");
  process.exit(1);
}

// ============================================
// USUARIOS SIMULADOS (normalmente en base de datos)
// ============================================

const usuarios = [
  { id: 1, email: "juan@mail.com", password: "123456", nombre: "Juan" },
  { id: 2, email: "ana@mail.com", password: "654321", nombre: "Ana" },
];

// ============================================
// 1. LOGIN - Dar el token al usuario
// ============================================

app.post("/api/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Paso 1: Buscar usuario
  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password,
  );

  // Paso 2: Si no existe, error
  if (!usuario) {
    return res.status(401).json({
      error: "Email o password incorrectos",
    });
  }

  // Paso 3: Crear token JWT con los datos del usuario
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
    },
    CLAVE_SECRETA,
    { expiresIn: "1h" }, // Token válido por 1 hora
  );

  // Paso 4: Devolver token
  res.json({
    mensaje: "Login exitoso",
    token: token, // 👈 El cliente debe guardar este token
  });
});

// ============================================
// 2. MIDDLEWARE - Verificar que el token sea válido
// ============================================

const verificarToken = (req: any, res: Response, next: NextFunction) => {
  // Paso 1: Obtener token del header
  const token = req.headers.authorization?.split(" ")[1];

  // Paso 2: Si no hay token, rechazar
  if (!token) {
    return res.status(401).json({
      error: "No hay token. Debes hacer login primero",
    });
  }

  try {
    // Paso 3: Verificar que el token sea válido
    const datosDelToken = jwt.verify(token, CLAVE_SECRETA);

    // Paso 4: Guardar datos del usuario en req para usarlos después
    req.usuario = datosDelToken;

    // Paso 5: Continuar a la siguiente función
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

// ============================================
// RUTAS
// ============================================

// Ruta pública - NO necesita token
app.get("/api/publico", (req: Request, res: Response) => {
  res.json({
    mensaje: "Esta ruta es pública, todos pueden verla",
  });
});

// Ruta privada - SÍ necesita token
app.get("/api/privado", verificarToken, (req: any, res: Response) => {
  // req.usuario contiene los datos del token
  res.json({
    mensaje: "Esta ruta es privada",
    tusDatos: req.usuario,
  });
});

// Ruta para ver mi perfil
app.get("/api/mi-perfil", verificarToken, (req: any, res: Response) => {
  res.json({
    mensaje: "Datos de tu perfil",
    id: req.usuario.id,
    nombre: req.usuario.nombre,
    email: req.usuario.email,
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`\n✅ Servidor corriendo en http://localhost:${PORT}\n`);

  console.log("📝 PASOS PARA PROBAR:");
  console.log("\n1️⃣ Hacer LOGIN (obtener token):");
  console.log("   POST http://localhost:3000/api/login");
  console.log("   Body: {");
  console.log('     "email": "juan@mail.com",');
  console.log('     "password": "123456"');
  console.log("   }");
  console.log("   → Te devolverá un TOKEN");

  console.log("\n2️⃣ Acceder a ruta pública (sin token):");
  console.log("   GET http://localhost:3000/api/publico");
  console.log("   → Funciona sin token");

  console.log("\n3️⃣ Intentar acceder a ruta privada SIN token:");
  console.log("   GET http://localhost:3000/api/privado");
  console.log("   → Error: No hay token");

  console.log("\n4️⃣ Acceder a ruta privada CON token:");
  console.log("   GET http://localhost:3000/api/privado");
  console.log("   Header: Authorization: Bearer <TU_TOKEN>");
  console.log("   → Funciona y muestra tus datos");

  console.log("\n👥 Usuarios para probar:");
  console.log("   • juan@mail.com / 123456");
  console.log("   • ana@mail.com / 654321");
  console.log("");
});
