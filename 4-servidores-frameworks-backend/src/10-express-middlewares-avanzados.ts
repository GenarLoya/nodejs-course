import express, { Request, Response, NextFunction } from "express";

const app = express();

console.log("=== 10. Middlewares en Express avanzados ===\n");

// ============================================
// Helper asincron para canalizar errores
// ============================================
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ============================================
// 1. MIDDLEWARE GLOBAL
// ============================================

// Middleware que se ejecuta en TODAS las peticiones
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Importante: llamar next() para continuar
});

// Middleware para parsear JSON (built-in de Express)
app.use(express.json());

// ============================================
// 2. MIDDLEWARE PERSONALIZADO - Logger
// ============================================

const logger = (req: Request, res: Response, next: NextFunction) => {
  const inicio = Date.now();

  // Ejecutar después de que la respuesta se envíe
  res.on("finish", () => {
    const duracion = Date.now() - inicio;
    console.log(
      `✅ ${req.method} ${req.url} - ${res.statusCode} - ${duracion}ms`,
    );
  });

  next();
};
app.use(logger);

// ============================================
// 3. MIDDLEWARE DE AUTENTICACIÓN SIMULADO
// ============================================

const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "No autorizado",
      mensaje: "Se requiere un token de autenticación",
    });
  }

  // Simulación de validación de token
  if (token === "Bearer token-secreto") {
    // Token válido, continuar
    next();
  } else {
    return res.status(403).json({
      error: "Prohibido",
      mensaje: "Token inválido",
    });
  }
};

// ============================================
// 4. MIDDLEWARE QUE MODIFICA REQ
// ============================================

const agregarFechaHora = (req: Request, res: Response, next: NextFunction) => {
  // Agregar propiedades personalizadas al request
  (req as any).timestamp = new Date();
  (req as any).requestId = Math.random().toString(36).substring(7);
  next();
};

app.use(agregarFechaHora);

// ============================================
// RUTAS DE EJEMPLO
// ============================================

// Ruta pública (sin autenticación)
app.get(
  "/api/publico",
  asyncHandler(async (req, res) => {
    res.json({
      mensaje: "Esta ruta es pública",
      timestamp: (req as any).timestamp,
      requestId: (req as any).requestId,
    });
  }),
);

// Ruta protegida (con middleware de autenticación)
app.get(
  "/api/privado",
  autenticar,
  asyncHandler(async (req, res) => {
    res.json({
      mensaje: "Esta ruta está protegida",
      datos: "Información sensible",
    });
  }),
);

// Ruta que simula un error síncrono
app.get(
  "/api/error",
  asyncHandler((req, res, next) => {
    // Simular un error
    throw new HttpError("Error simulado", 500); // Pasar el error al middleware de errores
  }),
);

// Ruta con operación asíncrona

// ============================================
// 5. MIDDLEWARE CONDICIONAL
// ============================================

const soloAdmin = (req: Request, res: Response, next: NextFunction) => {
  const rol = req.headers["x-rol"];

  if (rol === "admin") {
    next();
  } else {
    res.status(403).json({
      error: "Acceso denegado",
      mensaje: "Solo administradores pueden acceder",
    });
  }
};

app.delete(
  "/api/usuarios/:id",
  autenticar,
  soloAdmin,
  asyncHandler(async (req, res) => {
    res.json({
      mensaje: "Usuario eliminado (solo admin)",
      id: req.params.id,
    });
  }),
);

// ============================================
// 6. MIDDLEWARE PARA RUTAS ESPECÍFICAS
// ============================================

// Aplicar middleware solo a rutas que empiezan con /api/admin
app.use(
  "/api/admin",
  asyncHandler(async (req, res, next) => {
    console.log("🔒 Acceso a ruta de administración");
    next();
  }),
);

app.get("/api/admin/dashboard", autenticar, soloAdmin, (req, res) => {
  res.json({
    mensaje: "Dashboard de administración",
    usuarios: 100,
    ventas: 50000,
  });
});

// ============================================
// 7. MIDDLEWARE CON PARÁMETROS
// ============================================

const limitarTamañoBody = (maxSize: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers["content-length"] || "0");

    if (contentLength > maxSize) {
      return res.status(413).json({
        error: "Payload demasiado grande",
        maxSize: `${maxSize} bytes`,
      });
    }

    next();
  };
};

app.post("/api/upload", limitarTamañoBody(1024 * 100), (req, res) => {
  res.json({
    mensaje: "Archivo subido (máximo 100KB)",
  });
});

// ============================================
// 8. RUTA NO ENCONTRADA (404)
// ============================================

// Este middleware debe ir al final, antes del de errores
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    ruta: req.url,
    metodo: req.method,
  });
});

// ============================================
// 5. Middleware de errores
// ===========================================
class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error("❌ Error interno del servidor:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    mensaje: err.message,
  });
};
app.use(errorHandler);

// ============================================
// INICIAR SERVIDOR
// ============================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}\n`);
  console.log("📋 Rutas disponibles:");
  console.log("  GET    /api/publico             - Ruta pública");
  console.log(
    "  GET    /api/privado             - Ruta protegida (requiere token)",
  );
  console.log("  POST   /api/usuarios            - Crear usuario (validación)");
  console.log(
    "  POST   /api/usuarios/premium    - Usuario premium (auth + validación)",
  );
  console.log("  DELETE /api/usuarios/:id        - Eliminar (auth + admin)");
  console.log("  GET    /api/admin/dashboard     - Dashboard (auth + admin)");
  console.log("  GET    /api/error               - Simular error");
  console.log("  POST   /api/upload              - Subir archivo (max 100KB)");

  console.log("\n💡 Ejemplos de prueba:");
  console.log("\n1. Ruta pública (sin autenticación):");
  console.log("   curl http://localhost:3000/api/publico");

  console.log("\n2. Ruta privada (sin token - falla):");
  console.log("   curl http://localhost:3000/api/privado");

  console.log("\n3. Ruta privada (con token válido):");
  console.log(
    '   curl -H "Authorization: Bearer token-secreto" http://localhost:3000/api/privado',
  );

  console.log("\n4. Crear usuario (datos válidos):");
  console.log("   curl -X POST http://localhost:3000/api/usuarios \\");
  console.log('        -H "Content-Type: application/json" \\');
  console.log('        -d \'{"nombre":"Juan","email":"juan@ejemplo.com"}\'');

  console.log("\n5. Crear usuario (sin nombre - falla):");
  console.log("   curl -X POST http://localhost:3000/api/usuarios \\");
  console.log('        -H "Content-Type: application/json" \\');
  console.log('        -d \'{"email":"juan@ejemplo.com"}\'');

  console.log("\n6. Ruta admin (requiere auth y rol admin):");
  console.log('   curl -H "Authorization: Bearer token-secreto" \\');
  console.log('        -H "x-rol: admin" \\');
  console.log("        http://localhost:3000/api/admin/dashboard");

  console.log("\n7. Simular error:");
  console.log("   curl http://localhost:3000/api/error");
});
