// Promesas (Promises) en JavaScript

console.log("=== CREAR Y CONSUMIR PROMESAS ===\n");

// Crear una promesa
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, nombre: "Ana", email: "ana@ejemplo.com" });
      } else {
        reject(new Error("ID inválido"));
      }
    }, 1000);
  });
}

// Consumir promesa con .then() y .catch()
console.log("Solicitando usuario con ID 1...");
obtenerUsuario(1)
  .then(usuario => {
    console.log("Usuario obtenido:", usuario);
    return usuario.id;
  })
  .then(id => {
    console.log("ID del usuario:", id);
  })
  .catch(error => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Operación finalizada\n");
  });

// Promesa rechazada
setTimeout(() => {
  console.log("Solicitando usuario con ID -1...");
  obtenerUsuario(-1)
    .then(usuario => console.log(usuario))
    .catch(error => console.error("Error capturado:", error.stack));
}, 1500);

// Estados de una promesa:
// 1. pending (pendiente)
// 2. fulfilled (resuelta con éxito)
// 3. rejected (rechazada con error)

// Encadenamiento de promesas
function obtenerPedidos(usuarioId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, usuarioId, total: 100 },
        { id: 2, usuarioId, total: 200 }
      ]);
    }, 1000);
  });
}

setTimeout(() => {
  console.log("\n=== ENCADENAMIENTO DE PROMESAS ===");
  obtenerUsuario(1)
    .then(usuario => {
      console.log("Usuario:", usuario.nombre);
      return obtenerPedidos(usuario.id);
    })
    .then(pedidos => {
      console.log("Pedidos del usuario:", pedidos);
      const total = pedidos.reduce((sum, p) => sum + p.total, 0);
      console.log("Total de compras:", total);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}, 3000);
