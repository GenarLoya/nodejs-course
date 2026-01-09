// Promise.all, Promise.race, Promise.allSettled

function obtenerUsuario(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nombre: `Usuario ${id}` });
    }, Math.random() * 2000);
  });
}

console.log("=== OPERACIONES SECUENCIALES ===\n");

async function procesarDatosSecuencial() {
  console.time("Secuencial");
  
  const usuario1 = await obtenerUsuario(1);
  const usuario2 = await obtenerUsuario(2);
  const usuario3 = await obtenerUsuario(3);
  
  console.timeEnd("Secuencial");
  return [usuario1, usuario2, usuario3];
}

procesarDatosSecuencial().then(usuarios => {
  console.log("Usuarios (secuencial):", usuarios);
  
  // Ahora probar en paralelo
  setTimeout(async () => {
    console.log("\n=== OPERACIONES EN PARALELO ===\n");
    
    console.time("Paralelo");
    
    // Promise.all ejecuta todas las promesas simultáneamente
    const usuarios = await Promise.all([
      obtenerUsuario(1),
      obtenerUsuario(2),
      obtenerUsuario(3)
    ]);
    
    console.timeEnd("Paralelo");
    console.log("Usuarios (paralelo):", usuarios);
    
    // Promise.race - Retorna la primera que se resuelva
    console.log("\n=== PROMISE.RACE ===\n");
    const primerUsuario = await Promise.race([
      obtenerUsuario(1),
      obtenerUsuario(2),
      obtenerUsuario(3)
    ]);
    console.log("Primer usuario:", primerUsuario);
    
    // Promise.allSettled - Espera todas, sin importar si fallan
    console.log("\n=== PROMISE.ALLSETTLED ===\n");
    
    function obtenerConError(id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (id === 2) {
            reject(new Error(`Error con usuario ${id}`));
          } else {
            resolve({ id, nombre: `Usuario ${id}` });
          }
        }, 500);
      });
    }
    
    const resultados = await Promise.allSettled([
      obtenerConError(1),
      obtenerConError(2),
      obtenerConError(3)
    ]);
    
    resultados.forEach((resultado, index) => {
      if (resultado.status === "fulfilled") {
        console.log(`Resultado ${index + 1} - Éxito:`, resultado.value);
      } else {
        console.log(`Resultado ${index + 1} - Error:`, resultado.reason.message);
      }
    });
    
  }, 100);
});
