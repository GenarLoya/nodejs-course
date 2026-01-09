// Tipos de datos primitivos en JavaScript

// String
const nombre = "Node.js";
const lenguaje = 'JavaScript';
const mensaje = `Aprendiendo ${lenguaje}`; // Template literal

console.log("String:", nombre, lenguaje, mensaje);

// Number
const edad = 25;
const precio = 99.99;
const temperatura = -5;

console.log("Numbers:", edad, precio, temperatura);

// Boolean
const esActivo = true;
const tienePermiso = false;

console.log("Booleans:", esActivo, tienePermiso);

// Null y Undefined
const valorNulo = null;         // Ausencia intencional de valor
let valorIndefinido;             // undefined (no inicializado)

console.log("Null:", valorNulo);
console.log("Undefined:", valorIndefinido);

// Symbol (único e inmutable)
const id = Symbol('id');
console.log("Symbol:", id);
