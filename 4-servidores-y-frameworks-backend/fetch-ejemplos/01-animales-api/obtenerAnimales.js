// URL base de la API (ajústala si es diferente)
const API_URL = "http://localhost:3000/animales";

// Función para obtener animales
async function obtenerAnimales() {
  try {
    const response = await fetch(API_URL); // GET por defecto
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const animales = await response.json();
    console.log("Animales:", animales);

    // Aquí puedes actualizar tu UI con los datos, p. ej:
    // mostrarAnimales(animales);
  } catch (error) {
    console.error("Error al obtener animales:", error);
  }
}

// Llamar la función
obtenerAnimales();
