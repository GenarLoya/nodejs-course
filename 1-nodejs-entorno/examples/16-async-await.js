// Async/Await - Sintaxis moderna de asincronía

console.log("=== ASYNC/AWAIT ===\n");

// Funciones auxiliares que retornan promesas
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, nombre: "Pedro", email: "pedro@ejemplo.com" });
      } else {
        reject(new Error("ID inválido"));
      }
    }, 1000);
  });
}

function obtenerPedidos(usuarioId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, usuarioId, producto: "Laptop", total: 1000 },
        { id: 2, usuarioId, producto: "Mouse", total: 20 }
      ]);
    }, 1000);
  });
}

// Función async siempre retorna una promesa
async function obtenerDatos() {
  return "Datos obtenidos";
}

obtenerDatos().then(resultado => console.log(resultado));

// Usando await para esperar promesas
async function procesarUsuario(id) {
  try {
    console.log("\nProcesando usuario...");
    
    // await pausa la ejecución hasta que la promesa se resuelva
    const usuario = await obtenerUsuario(id);
    console.log("Usuario obtenido:", usuario);
    
    const pedidos = await obtenerPedidos(usuario.id);
    console.log("Pedidos obtenidos:", pedidos);
    
    const totalCompras = pedidos.reduce((sum, p) => sum + p.total, 0);
    console.log("Total de compras:", totalCompras);
    
    return { usuario, pedidos, totalCompras };
    
  } catch (error) {
    console.error("Error en procesarUsuario:", error.message);
    throw error;
  }
}

// Llamar función async
procesarUsuario(1)
  .then(resultado => {
    console.log("\nResultado final:", resultado);
  })
  .catch(error => {
    console.error("Error capturado:", error);
  });

// Probar con error
setTimeout(() => {
  console.log("\n=== PROBANDO CON ERROR ===");
  procesarUsuario(-1)
    .catch(error => console.error("Error manejado:", error.message));
}, 5000);
