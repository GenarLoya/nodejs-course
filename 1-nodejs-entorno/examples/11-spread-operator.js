// Spread operator (...)

console.log("=== COPIAR ARRAYS ===");

// Copiar arrays
const original = [1, 2, 3];
const copia = [...original];
copia.push(4);

console.log("Original:", original);
console.log("Copia:", copia);

console.log("\n=== COMBINAR ARRAYS ===");

// Combinar arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinado = [...arr1, ...arr2];
console.log("Combinado:", combinado);

console.log("\n=== COPIAR OBJETOS ===");

// Copiar objetos
const usuario = { nombre: "Ana", edad: 25 };
const usuarioCopia = { ...usuario };
usuarioCopia.ciudad = "Madrid";

console.log("Original:", usuario);
console.log("Copia:", usuarioCopia);

console.log("\n=== COMBINAR OBJETOS ===");

// Combinar objetos (sobrescribe propiedades duplicadas)
const datosBasicos = { nombre: "Pedro", edad: 30 };
const datosExtra = { email: "pedro@ejemplo.com", edad: 31 };
const usuarioCompleto = { ...datosBasicos, ...datosExtra, nombre: "Tere" };
console.log("Usuario completo:", usuarioCompleto);

console.log("\n=== AGREGAR PROPIEDADES ===");

// Agregar propiedades a un objeto
const producto = { nombre: "Laptop", precio: 1000 };
const productoConDescuento = {
  ...producto,
  descuento: 10,
  precioFinal: 900,
};
console.log("Producto con descuento:", productoConDescuento);

console.log("\n=== USAR EN FUNCIONES ===");

// Usar en funciones
const numeros = [5, 10, 15, 20];
console.log("Máximo:", Math.max(...numeros));
console.log("Mínimo:", Math.min(...numeros));
