// npm i axios

const axios = require("axios");

console.log("=== MÓDULO AXIOS ===\n");

async function ejemploAxios() {
  try {
    // Realizar una solicitud GET
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    console.log("Respuesta GET:");
    console.log(response.data);
  } catch (error) {
    console.error("Error en la solicitud Axios:", error.message);
  }
}

ejemploAxios();
