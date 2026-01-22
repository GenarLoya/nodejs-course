// Async/Await - Sintaxis moderna de asincronía

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

async function obtenerPedidosAsync(usuarioId) {
  const pedidos = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, total: 50.5, usuarioId },
        { id: 2, total: 75.0, usuarioId },
      ]);
    }, 1000);
  });

  return pedidos;
}

// Función async siempre retorna una promesa
async function obtenerDatos() {
  return "Datos obtenidos";
}

obtenerDatos().then((resultado) => console.log(resultado));

// Usando await para esperar promesas
async function procesarUsuario(id) {
  try {
    console.log("\nProcesando usuario...");

    // await pausa la ejecución hasta que la promesa se resuelva
    const usuario = await obtenerUsuario(id);
    console.log("Usuario obtenido:", usuario);

    const pedidos = await obtenerPedidosAsync(usuario.id);
    console.log("Pedidos obtenidos:", pedidos);

    const totalCompras = pedidos.reduce((sum, p) => sum + p.total, 0);
    console.log("Total de compras:", totalCompras);

    return { usuario, pedidos, totalCompras };
  } catch (error) {
    console.error("Error en procesarUsuario:", error.message);
    throw error;
  }
}

// Fetch API con Promise
function fetchDatosPromise(url) {
  fetch(url)
    .then((res) => {
      console.log("Resolved with status: ", res.status)

      if (!res.ok) {
        throw new Error("Error en la peticion")
      }

      return res.json()
    })
    .then((data) => {
      console.log("Datos obtenidos con Promise:", data);
    })
    .catch((error) => {
      console.error("Error en fetch con Promise:", error.message);
    });
}

// Fetch API con Async/Await
async function fetchDatosAsync(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error en la peticion")
    }

    const data = await res.json();
    console.log("Datos obtenidos con Async/Await:", data);
  } catch (error) {
    console.error("Error en fetch con Async/Await:", error.message);
  }
}

async function main() {
  // Llamar función async
  console.log("=== ASYNC/AWAIT ===\n");

  await procesarUsuario(1)
    .then((resultado) => {
      console.log("\nResultado final:", resultado);
    })
    .catch((error) => {
      console.error("Error capturado:", error);
    });

  const usuarioProcesado = await procesarUsuario(2);
  console.log("\nUsuario procesado:", usuarioProcesado);

  console.log("\n=== PROBANDO CON ERROR ===");
  await procesarUsuario(-1)
    .then((resultado) => {
      console.log("Resultado final:", resultado);
    })
    .catch((error) => console.error("Error manejado:", error.message));

  console.log("\n=== FETCH API ===\n");

  const url = "https://jsonplaceholder.typicode.com/postss/1";

  // Llamar ambas funciones de fetch
  await fetchDatosPromise(url)

  await fetchDatosAsync(url);
}

main();
