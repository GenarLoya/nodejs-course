import { z } from "zod";

console.log("=== 07. Introducción a Zod ===\n");

// 1. Esquemas básicos
console.log("1. Esquemas básicos de tipos primitivos:");

const StringSchema = z.string();
const NumberSchema = z.number();

// Validar con parse() - lanza error si falla
try {
  const texto = StringSchema.parse("Hola mundo");
  console.log("✅ String válido:", texto);
} catch (error) {
  console.log("❌ Error:", error);
}

// Validar con safeParse() - retorna resultado
const resultadoNumero = NumberSchema.safeParse(42);
if (resultadoNumero.success) {
  console.log("✅ Número válido:", resultadoNumero.data);
} else {
  console.log("❌ Error:", resultadoNumero.error.issues);
}

// Intentar validar tipo incorrecto
const resultadoInvalido = NumberSchema.safeParse("no es un número");
if (!resultadoInvalido.success) {
  console.log("❌ Validación falló:", resultadoInvalido.error.issues);
}

console.log("\n2. Esquemas con validaciones:");

// String con validaciones
const EmailSchema = z.email();
const PasswordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres");

const emailValido = EmailSchema.safeParse("usuario@ejemplo.com");
console.log("Email válido:", emailValido.success ? "✅" : "❌");

const emailInvalido = EmailSchema.safeParse("no-es-email");
console.log("Email inválido:", emailInvalido.success ? "✅" : "❌");
if (!emailInvalido.success) {
  console.log("  Motivo:", emailInvalido.error.issues);
}

const passwordCorta = PasswordSchema.safeParse("123");
if (!passwordCorta.success) {
  console.log("❌ Contraseña corta:", passwordCorta.error.issues);
}

console.log("\n3. Esquemas de objetos:");

// Definir un esquema para un usuario
const UsuarioSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.email("Email inválido"),
  edad: z.number().int().positive().min(18, "Debe ser mayor de edad"),
  activo: z.boolean().optional().default(true),
});

// Validar un usuario válido
const usuarioValido = {
  nombre: "Ana García",
  email: "ana@ejemplo.com",
  edad: 25,
};

const resultado1 = UsuarioSchema.safeParse(usuarioValido);
if (resultado1.success) {
  console.log("✅ Usuario válido:");
  console.log("  ", resultado1.data);
}

// Validar un usuario inválido
const usuarioInvalido = {
  nombre: "AB", // Muy corto
  email: "no-es-email", // Email inválido
  edad: 15, // Menor de edad
};

const resultado2 = UsuarioSchema.safeParse(usuarioInvalido);
if (!resultado2.success) {
  console.log("\n❌ Usuario inválido - Errores encontrados:");
  resultado2.error.issues.forEach((err) => {
    console.log(`  - ${err.path.join(".")}: ${err.message}`);
  });
}

console.log("\n4. Esquema de producto con diferentes tipos:");

const ProductoSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1),
  precio: z.number().positive(),
  categoria: z.enum(["electrónica", "ropa", "alimentos", "hogar"]),
  stock: z.number().int().min(0),
  disponible: z.boolean(),
  etiquetas: z.array(z.string()).optional(),
});

type Producto = z.infer<typeof ProductoSchema>;

const producto: Producto = {
  id: 1,
  nombre: "Laptop",
  precio: 1200,
  categoria: "electrónica",
  stock: 10,
  disponible: true,
  etiquetas: ["nuevo", "oferta"],
};

const resultadoProducto = ProductoSchema.safeParse(producto);
if (resultadoProducto.success) {
  console.log("✅ Producto válido:");
  console.log("  ", resultadoProducto.data);
}

console.log("\n5. Arrays y validaciones:");

const ArrayNumerosSchema = z.array(z.number()).min(1).max(10);

const numeros = [1, 2, 3, 4, 5];
const resultadoArray = ArrayNumerosSchema.safeParse(numeros);
console.log("Array de números válido:", resultadoArray.success ? "✅" : "❌");

const arrayVacio = ArrayNumerosSchema.safeParse([]);
if (!arrayVacio.success) {
  console.log("❌ Array vacío:", arrayVacio.error.issues);
}

console.log("\n6. Valores opcionales y por defecto:");

const ConfiguracionSchema = z.object({
  titulo: z.string(),
  tema: z.enum(["claro", "oscuro"]).default("claro"),
  notificaciones: z.boolean().optional(),
  idioma: z.string().default("es"),
});

const config1 = ConfiguracionSchema.parse({
  titulo: "Mi App",
});

console.log("Configuración con valores por defecto:");
console.log("  ", config1);

console.log("\n7. Transformaciones:");

const FechaSchema = z.string().transform((str) => new Date(str));
const NumeroStringSchema = z.string().regex(/^\d+$/).transform(Number);

const fecha = FechaSchema.parse("2024-01-15");
console.log("Fecha transformada:", fecha instanceof Date ? "✅" : "❌", fecha);

const numero = NumeroStringSchema.parse("123");
console.log(
  "String a número:",
  typeof numero === "number" ? "✅" : "❌",
  numero,
);

console.log("\n8. Validaciones personalizadas con refine:");

const EdadSchema = z.number().refine((edad) => edad >= 18 && edad <= 100, {
  message: "La edad debe estar entre 18 y 100 años",
});

const edadValida = EdadSchema.safeParse(25);
console.log("Edad 25:", edadValida.success ? "✅" : "❌");

const edadInvalida = EdadSchema.safeParse(150);
if (!edadInvalida.success) {
  console.log("❌ Edad 150:", edadInvalida.error.issues);
}

console.log("\n=== Resumen ===");
console.log("✅ Zod permite validar datos en tiempo de ejecución");
console.log("✅ Proporciona inferencia automática de tipos TypeScript");
console.log("✅ Maneja validaciones simples y complejas");
console.log("✅ safeParse() es seguro y no lanza errores");
console.log("✅ parse() lanza errores si la validación falla");
