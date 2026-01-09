// Estructuras de datos - Arrays

// Crear arrays
const numeros = [1, 2, 3, 4, 5];
const frutas = ["manzana", "pera", "uva"];
const mixto = [1, "texto", true, null, { id: 1 }];

console.log("Numeros:", numeros);
console.log("Frutas:", frutas);

// Acceder a elementos
console.log("Primera fruta:", frutas[0]);
console.log("Longitud:", frutas.length);

// Modificar arrays
frutas.push("naranja");        // Agregar al final
console.log("Después de push:", frutas);

frutas.pop();                  // Eliminar del final
console.log("Después de pop:", frutas);

frutas.unshift("fresa");       // Agregar al inicio
console.log("Después de unshift:", frutas);

frutas.shift();                // Eliminar del inicio
console.log("Después de shift:", frutas);

// Arrays de objetos (común en backend)
const usuarios = [
  { id: 1, nombre: "Juan", rol: "admin" },
  { id: 2, nombre: "María", rol: "user" },
  { id: 3, nombre: "Pedro", rol: "user" }
];

console.log("\nUsuarios:", usuarios);
console.log("Primer usuario:", usuarios[0].nombre);
