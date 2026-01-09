const fs = require("fs/promises");
const path = require("path");

console.log("=== MÓDULO FS CON PROMISES ===\n");

async function ejemploFsAsync() {
  try {
    // Crear directorio
    const dirEjemplos = path.join("temp-async");
    await fs.mkdir(dirEjemplos, { recursive: true });
    console.log("Directorio creado:", dirEjemplos);

    // Escribir archivo
    const archivoPath = path.join(dirEjemplos, "datos.txt");
    await fs.writeFile(archivoPath, "Contenido inicial\n");
    console.log("Archivo escrito");

    // Agregar contenido
    await fs.appendFile(archivoPath, "Línea adicional\n");
    await fs.appendFile(archivoPath, "Otra línea más\n");
    console.log("Contenido agregado");

    // Leer archivo
    const contenido = await fs.readFile(archivoPath, "utf8");
    console.log("\nContenido del archivo:");
    console.log(contenido);

    // Información del archivo
    const stats = await fs.stat(archivoPath);
    console.log("Tamaño:", stats.size, "bytes");
    console.log("Última modificación:", stats.mtime);

    // Leer directorio
    const archivos = await fs.readdir(dirEjemplos);
    console.log("\nArchivos en el directorio:", archivos);

    // Escribir JSON
    const archivoJSON = path.join(dirEjemplos, "datos.json");
    const datos = {
      nombre: "Node.js",
      version: "20.0.0",
      fecha: new Date().toISOString(),
    };
    await fs.writeFile(archivoJSON, JSON.stringify(datos, null, 2));
    console.log("\nJSON escrito");

    // Leer JSON
    const contenidoJSON = await fs.readFile(archivoJSON, "utf8");
    const datosLeidos = JSON.parse(contenidoJSON);
    console.log("JSON leído:", datosLeidos);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

ejemploFsAsync();
