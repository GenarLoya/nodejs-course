// Variables y constantes en JavaScript

// ✅ const - No se puede reasignar (usar por defecto)
const API_URL = "https://api.ejemplo.com";
const PORT = 3000;

console.log("API_URL:", API_URL);
console.log("PORT:", PORT);

// ✅ let - Se puede reasignar (usar cuando sea necesario)
let contador = 0;
contador = contador + 1;
console.log("Contador:", contador);

// ❌ var - NO usar (scope confuso, hoisting)
var nombre = "Juan"; // Evitar
console.log("Nombre (var):", nombre);

// Ejemplos de scope
function ejemploScope() {
  const x = 10; // Solo existe dentro de la función

  if (true) {
    const y = 20; // Solo existe dentro del if
    let z = 30; // Solo existe dentro del if
    console.log("Dentro del if:", x, y, z);
  }

  console.log("Fuera del if:", x);
  // console.log(y); // ❌ Error: y no está definida
}

ejemploScope();

// ==========================================
// CONDICIONALES Y OPERADORES LÓGICOS
// ==========================================

// VALORES TRUTHY Y FALSY
console.log("\n--- Valores Falsy ---");
console.log("false:", Boolean(false));
console.log("0:", Boolean(0));
console.log("'':", Boolean(""));
console.log("null:", Boolean(null));
console.log("undefined:", Boolean(undefined));
console.log("NaN:", Boolean(NaN));

console.log("\n--- Valores Truthy ---");
console.log("true:", Boolean(true));
console.log("1:", Boolean(1));
console.log("'texto':", Boolean("texto"));
console.log("[]:", Boolean([]));
console.log("{}:", Boolean({}));

// if
const edad = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
}

// if-else
const temperatura = 25;

if (temperatura > 30) {
  console.log("Hace calor");
} else {
  console.log("Temperatura agradable");
}

// IF-ELSE-IF-ELSE
const nota = 85;

if (nota >= 90) {
  console.log("Excelente");
} else if (nota >= 70) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}

// OPERADOR TERNARIO (condición ? valorSiTrue : valorSiFalse)
const esAdulto = edad >= 18 ? "Sí" : "No";
console.log("¿Es adulto?", esAdulto);

const mensaje = temperatura > 30 ? "Hace calor" : "Está fresco";
console.log(mensaje);

// Ternario anidado (no recomendado si es muy complejo)
const calificacion = nota >= 90 ? "A" : nota >= 70 ? "B" : "C";
console.log("Calificación:", calificacion);

// OPERADOR && (AND lógico)
// Devuelve el primer valor falsy O el último valor si todos son truthy

const usuario = { nombre: "Ana", premium: true };

// Uso como condicional corto
usuario.premium && console.log("Usuario premium detectado");

// Uso para asignar valores
const descuento = usuario.premium && 20; // 20 si es premium, false si no
console.log("Descuento:", descuento);

// Evaluar múltiples condiciones
const puedeComprar = edad >= 18 && usuario.premium;
console.log("¿Puede comprar?", puedeComprar);

// OPERADOR || (OR lógico)
// Devuelve el primer valor truthy O el último valor si todos son falsy

const nombreUsuario = null;
const nombrePorDefecto = nombreUsuario || "Invitado";
console.log("Nombre:", nombrePorDefecto);

// Valores por defecto en funciones
function saludar(nombre) {
  nombre = nombre || "Desconocido";
  console.log(`Hola, ${nombre}`);
}

saludar("Carlos"); // Hola, Carlos
saludar(); // Hola, Desconocido

// COMBINACIÓN DE OPERADORES
const esEstudiante = true;
const tieneDescuento = usuario.premium || esEstudiante;
console.log("¿Tiene descuento?", tieneDescuento);

// Validación con && y ||
const email = "usuario@ejemplo.com";
const emailValido = email && email.includes("@") && email.length > 5;
console.log("Email válido:", emailValido);

// OPERADOR NULLISH COALESCING ?? (preferir sobre ||)
const valor1 = 0;
const resultado1 = valor1 || 100; // 100 (porque 0 es falsy)
const resultado2 = valor1 ?? 100; // 0 (porque 0 no es null/undefined)
console.log("Con ||:", resultado1, "| Con ??:", resultado2);

const nombre2 = null;
const nombreFinal = nombre2 ?? "Sin nombre";
console.log("Nombre final:", nombreFinal);
