// Estructuras de datos - Sets y Maps

console.log("=== SETS ===");

// Set - Colección de valores únicos
const numerosUnicos = new Set([1, 2, 2, 3, 3, 4]);
console.log("Set:", numerosUnicos); // Set { 1, 2, 3, 4 }

numerosUnicos.add(5);
console.log("Después de add(5):", numerosUnicos);

console.log("¿Tiene el 3?:", numerosUnicos.has(3));
console.log("Tamaño:", numerosUnicos.size);

numerosUnicos.delete(2);
console.log("Después de delete(2):", numerosUnicos);

console.log("\n=== MAPS ===");

// Map - Pares clave-valor (cualquier tipo de clave)
const cache = new Map();

cache.set("user_1", { nombre: "Ana", edad: 25 });
cache.set("user_2", { nombre: "Luis", edad: 30 });

console.log("Obtener user_1:", cache.get("user_1"));
console.log("¿Tiene user_3?:", cache.has("user_3"));
console.log("Tamaño del Map:", cache.size);

// Iterar sobre Map
console.log("\nIterando sobre el Map:");
for (const [key, value] of cache) {
  console.log(`${key}: ${value.nombre} - ${value.edad} años`);
}
