// Asincronía básica en Node.js

console.log("=== CÓDIGO BLOQUEANTE vs NO BLOQUEANTE ===\n");

// ❌ Código bloqueante (síncrono)
console.log("Inicio bloqueante");

// Operación costosa que bloquea
let suma = 0;
for (let i = 0; i < 1000000000; i++) {
  suma += i;
}

console.log("Fin bloqueante (después de esperar)");

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
