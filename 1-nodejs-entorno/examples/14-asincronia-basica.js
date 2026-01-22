// Asincronía básica en Node.js

console.log("=== CÓDIGO BLOQUEANTE vs NO BLOQUEANTE ===\n");

// ❌ Código bloqueante (síncrono)
console.log("Inicio bloqueante");
console.time()

// Operación costosa que bloquea
let suma = 0;
const largeArray = Array.from({ length: 10 }).fill(1)

for (const n in largeArray) {
  console.log(n)
}

console.log("Fin bloqueante (después de esperar)");
console.timeEnd()

largeArray.forEach((e, i) => console.log(i))

console.log("Inicia operacion asincrona")
largeArray.forEach(async (e,i) => console.log(i))

// ✅ Código no bloqueante (asíncrono)
console.log("\nInicio no bloqueante");

setTimeout(() => {
  console.log("Operación asíncrona completada (después de 2s)");
}, 2000);

console.log("Fin no bloqueante (inmediato)");

// Salida esperada:
// Inicio bloqueante
// Fin bloqueante (después de esperar)
// Inicio no bloqueante
// Fin no bloqueante (inmediato)
// Operación asíncrona completada (después de 2s)
