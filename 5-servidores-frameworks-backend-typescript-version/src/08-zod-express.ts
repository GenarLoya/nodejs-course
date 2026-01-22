import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

// Esquemas de validación con Zod
const CrearUsuarioSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.email("Email inválido"),
  edad: z.number().int().positive().min(18, "Debe ser mayor de edad"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const ActualizarUsuarioSchema = CrearUsuarioSchema.omit({
  password: true,
}).extend({
  id: z.number().int().positive(),
});

const CrearProductoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  precio: z.number().positive("El precio debe ser positivo"),
  categoria: z.enum(["electrónica", "ropa", "alimentos", "hogar"], {
    error: "Categoría inválida",
  }),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  disponible: z.boolean().default(true),
  etiquetas: z.array(z.string()).min(0),
});

// Base de datos simulada
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  disponible: boolean;
  etiquetas?: string[];
}

let usuarios: Usuario[] = [
  { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", edad: 25 },
  { id: 2, nombre: "Luis Pérez", email: "luis@ejemplo.com", edad: 30 },
];

let productos: Producto[] = [
  {
    id: 1,
    nombre: "Laptop",
    descripcion: "Laptop de alta gama con 16GB RAM",
    precio: 1200,
    categoria: "electrónica",
    stock: 10,
    disponible: true,
    etiquetas: ["nuevo", "oferta"],
  },
];

let siguienteIdUsuario = 3;
let siguienteIdProducto = 2;

// ============================================
// RUTAS DE USUARIOS CON VALIDACIÓN ZOD
// ============================================

// GET - Listar usuarios
app.get("/api/usuarios", (req, res) => {
  res.json({
    success: true,
    data: usuarios,
    total: usuarios.length,
  });
});

// POST - Crear usuario con validación
app.post("/api/usuarios", (req, res) => {
  // Validar el body con Zod
  const resultado = CrearUsuarioSchema.safeParse(req.body);

  // Si la validación falla, retornar error 400
  if (!resultado.success) {
    return res.status(400).json({
      success: false,
      error: "Validación fallida",
      detalles: resultado.error.issues,
    });
  }

  // Datos validados y con tipos correctos
  const datosValidados = resultado.data;

  // Verificar que el email no exista
  const emailExiste = usuarios.some((u) => u.email === datosValidados.email);
  if (emailExiste) {
    return res.status(400).json({
      success: false,
      error: "El email ya está registrado",
    });
  }

  // Crear usuario (sin guardar password en este ejemplo)
  const nuevoUsuario: Usuario = {
    id: siguienteIdUsuario++,
    nombre: datosValidados.nombre,
    email: datosValidados.email,
    edad: datosValidados.edad,
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    success: true,
    message: "Usuario creado exitosamente",
    data: nuevoUsuario,
  });
});

// PUT - Actualizar usuario con validación
app.put("/api/usuarios/:id", (req, res) => {
  const id = req.params?.id ?? null;

  // Validar el body
  const resultado = ActualizarUsuarioSchema.safeParse({
    id,
    ...req.body,
  });

  if (!resultado.success) {
    return res.status(400).json({
      success: false,
      error: "Validación fallida",
      detalles: resultado.error.issues,
    });
  }

  const indice = usuarios.findIndex((u) => u.id === resultado.data.id);

  if (indice === -1) {
    return res.status(404).json({
      success: false,
      error: "Usuario no encontrado",
    });
  }

  // Si se actualiza el email, verificar que no exista
  if (resultado.data.email) {
    const emailExiste = usuarios.some(
      (u) => u.email === resultado.data.email && u.id !== resultado.data.id,
    );
    if (emailExiste) {
      return res.status(400).json({
        success: false,
        error: "El email ya está registrado",
      });
    }
  }

  // Actualizar solo los campos proporcionados
  usuarios[indice] = {
    ...usuarios[indice],
    ...resultado.data,
  };

  res.json({
    success: true,
    message: "Usuario actualizado exitosamente",
    data: usuarios[indice],
  });
});

// ============================================
// RUTAS DE PRODUCTOS CON VALIDACIÓN ZOD
// ============================================

// GET - Listar productos
app.get("/api/productos", (req, res) => {
  res.json({
    success: true,
    data: productos,
    total: productos.length,
  });
});

// POST - Crear producto con validación
app.post("/api/productos", (req, res) => {
  const resultado = CrearProductoSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      success: false,
      error: "Validación fallida",
      detalles: resultado.error.issues,
    });
  }

  const datosValidados = resultado.data;

  const nuevoProducto: Producto = {
    id: siguienteIdProducto++,
    ...datosValidados,
  };

  productos.push(nuevoProducto);

  res.status(201).json({
    success: true,
    message: "Producto creado exitosamente",
    data: nuevoProducto,
  });
});

// ============================================
// RUTA DE PRUEBA - Enviar datos inválidos
// ============================================

app.get("/api/test/validacion", (req, res) => {
  res.json({
    message: "Ejemplos de peticiones para probar la validación",
    ejemplos: {
      crearUsuarioValido: {
        url: "POST /api/usuarios",
        body: {
          nombre: "Juan Pérez",
          email: "juan@ejemplo.com",
          edad: 25,
          password: "password123",
        },
      },
      crearUsuarioInvalido: {
        url: "POST /api/usuarios",
        body: {
          nombre: "AB", // Muy corto
          email: "no-es-email", // Email inválido
          edad: 15, // Menor de edad
          password: "123", // Contraseña muy corta
        },
        erroresEsperados: [
          "El nombre debe tener al menos 3 caracteres",
          "Email inválido",
          "Debe ser mayor de edad",
          "La contraseña debe tener al menos 8 caracteres",
        ],
      },
      crearProductoValido: {
        url: "POST /api/productos",
        body: {
          nombre: "Mouse Gaming",
          descripcion: "Mouse inalámbrico de alta precisión",
          precio: 45.99,
          categoria: "electrónica",
          stock: 20,
          disponible: true,
          etiquetas: ["gaming", "inalámbrico"],
        },
      },
      crearProductoInvalido: {
        url: "POST /api/productos",
        body: {
          nombre: "",
          descripcion: "Corta",
          precio: -10,
          categoria: "invalida",
          stock: -5,
        },
        erroresEsperados: [
          "El nombre es requerido",
          "La descripción debe tener al menos 10 caracteres",
          "El precio debe ser positivo",
          "Categoría inválida",
          "El stock no puede ser negativo",
        ],
      },
    },
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log("\n📝 Endpoints disponibles:");
  console.log("  GET  /api/usuarios           - Listar usuarios");
  console.log(
    "  POST /api/usuarios           - Crear usuario (con validación)",
  );
  console.log("  PATCH /api/usuarios/:id      - Actualizar usuario");
  console.log("  GET  /api/productos          - Listar productos");
  console.log(
    "  POST /api/productos          - Crear producto (con validación)",
  );
  console.log("  GET  /api/test/validacion    - Ver ejemplos de validación");
  console.log(
    "\n💡 Prueba con datos válidos e inválidos para ver la validación en acción",
  );
  console.log(
    "📌 Visita http://localhost:3000/api/test/validacion para ver ejemplos",
  );
});
