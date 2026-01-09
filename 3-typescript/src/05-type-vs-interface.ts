// Ejemplo 6: Type vs Interface
// Ambos sirven para definir la estructura de objetos, pero tienen diferencias importantes

console.log("=== TYPE vs INTERFACE ===\n");

// ============================================
// 1. SIMILITUDES - Ambos pueden definir objetos
// ============================================

// Con Interface
interface UsuarioInterface {
  id: number;
  nombre: string;
  email: string;
}

// Con Type
type UsuarioType = {
  id: number;
  nombre: string;
  email: string;
};

// Ambos funcionan igual para objetos simples
const usuario1: UsuarioInterface = {
  id: 1,
  nombre: "Ana",
  email: "ana@example.com"
};

const usuario2: UsuarioType = {
  id: 2,
  nombre: "Luis",
  email: "luis@example.com"
};

console.log("1. Ambos pueden definir objetos:");
console.log(usuario1);
console.log(usuario2);

// ============================================
// 2. DIFERENCIA: Interface se puede EXTENDER
// ============================================

console.log("\n2. Interface se puede extender:");

interface Persona {
  nombre: string;
  edad: number;
}

// Interface puede extender otra interface
interface Empleado extends Persona {
  puesto: string;
  salario: number;
}

const empleado: Empleado = {
  nombre: "Carlos",
  edad: 30,
  puesto: "Desarrollador",
  salario: 50000
};

console.log(empleado);

// ============================================
// 3. DIFERENCIA: Type puede usar UNIONES e INTERSECCIONES
// ============================================

console.log("\n3. Type puede crear tipos más complejos:");

// Union Types - un valor puede ser de varios tipos
type Estado = "activo" | "inactivo" | "pendiente";
type ID = number | string;

const estado1: Estado = "activo";
const id1: ID = 123;
const id2: ID = "ABC-456";

console.log(`Estado: ${estado1}`);
console.log(`ID numérico: ${id1}`);
console.log(`ID string: ${id2}`);

// Intersection Types - combina varios tipos
type PersonaBasica = {
  nombre: string;
  edad: number;
};

type Contacto = {
  email: string;
  telefono: string;
};

// Intersección: tiene TODAS las propiedades
type PersonaCompleta = PersonaBasica & Contacto;

const persona: PersonaCompleta = {
  nombre: "María",
  edad: 28,
  email: "maria@example.com",
  telefono: "555-1234"
};

console.log("\nPersona completa (intersección):");
console.log(persona);

// ============================================
// 4. DIFERENCIA: Interface se puede REABRIR
// ============================================

console.log("\n4. Interface se puede declarar múltiples veces:");

interface Configuracion {
  tema: string;
}

// Puedo declarar la misma interface otra vez y se FUSIONAN
interface Configuracion {
  idioma: string;
}

// Ahora Configuracion tiene AMBAS propiedades
const config: Configuracion = {
  tema: "oscuro",
  idioma: "es"
};

console.log(config);

// ¡Con Type esto daría ERROR!
// type ConfiguracionType = { tema: string };
// type ConfiguracionType = { idioma: string }; // ❌ Error: Duplicate identifier

// ============================================
// 5. CASOS DE USO PRÁCTICOS
// ============================================

console.log("\n5. Casos de uso recomendados:");

// ✅ USA INTERFACE para objetos y clases
interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

// ✅ USA TYPE para tipos primitivos, uniones y aliases
type Respuesta = "si" | "no" | "tal vez";
type Callback = (data: string) => void;
type Nullable<T> = T | null;

// Ejemplo con Type Union
type MetodoPago = "efectivo" | "tarjeta" | "transferencia";

function procesarPago(metodo: MetodoPago, monto: number): void {
  console.log(`\nProcesando pago de $${monto} con ${metodo}`);
}

procesarPago("tarjeta", 100);

// Ejemplo con Type Alias para funciones
type OperacionMatematica = (a: number, b: number) => number;

const sumar: OperacionMatematica = (a, b) => a + b;
const multiplicar: OperacionMatematica = (a, b) => a * b;

console.log(`\n5 + 3 = ${sumar(5, 3)}`);
console.log(`5 * 3 = ${multiplicar(5, 3)}`);

// ============================================
// 6. RESUMEN
// ============================================

console.log("\n" + "=".repeat(50));
console.log("📋 RESUMEN:");
console.log("=".repeat(50));
console.log("✅ INTERFACE:");
console.log("   - Ideal para definir formas de objetos");
console.log("   - Se puede extender con 'extends'");
console.log("   - Se puede reabrir (declaration merging)");
console.log("   - Mejor para POO y APIs públicas");
console.log("");
console.log("✅ TYPE:");
console.log("   - Más flexible y poderoso");
console.log("   - Puede crear uniones (|) e intersecciones (&)");
console.log("   - Puede crear aliases de cualquier tipo");
console.log("   - Ideal para tipos complejos y utilitarios");
console.log("");
console.log("💡 TIP: En la mayoría de casos son intercambiables.");
console.log("   Si tienes dudas, usa INTERFACE para objetos.");
console.log("=".repeat(50));
