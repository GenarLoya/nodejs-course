const fs = require("fs");
const path = require("path");

console.log("=== MÓDULO FS - FILE SYSTEM ===\n");

// Crear directorio para ejemplos
const dirEjemplos = path.join(__dirname, "temp-ejemplos");
console.log("__dirname:",__dirname)
console.log("dirEjemplos:", dirEjemplos)

if (!fs.existsSync(dirEjemplos)) {
  fs.mkdirSync(dirEjemplos);
  console.log("Directorio creado:", dirEjemplos);
}

// ===== ESCRIBIR ARCHIVOS =====
console.log("\n=== ESCRIBIR ARCHIVOS ===");

const archivoTexto = path.join(dirEjemplos, "salida.txt");
fs.writeFileSync(archivoTexto, "Hola desde Node.js\n");
console.log("Archivo escrito:", archivoTexto);

// Agregar contenido (append)
fs.appendFileSync(archivoTexto, "Segunda línea\n");
fs.appendFileSync(archivoTexto, "Tercera línea\n");
console.log("Contenido agregado");

// ===== LEER ARCHIVOS =====
console.log("\n=== LEER ARCHIVOS ===");

const contenido = fs.readFileSync(archivoTexto, "utf8");
console.log("Contenido del archivo:");
console.log(contenido);

// ===== INFORMACIÓN DEL ARCHIVO =====
console.log("=== INFORMACIÓN DEL ARCHIVO ===");

const stats = fs.statSync(archivoTexto);
console.log("Tamaño:", stats.size, "bytes");
console.log("Es archivo:", stats.isFile());
console.log("Es directorio:", stats.isDirectory());
console.log("Última modificación:", stats.mtime);

// ===== LEER DIRECTORIO =====
console.log("\n=== LEER DIRECTORIO ===");

const archivos = fs.readdirSync(dirEjemplos);
console.log("Archivos en el directorio:", archivos);

// ===== COPIAR ARCHIVO =====
console.log("\n=== COPIAR ARCHIVO ===");

const archivoCopia = path.join(dirEjemplos, "copia.txt");
fs.copyFileSync(archivoTexto, archivoCopia);
console.log("Archivo copiado a:", archivoCopia);

// ===== RENOMBRAR/MOVER =====
console.log("\n=== RENOMBRAR ARCHIVO ===");

const archivoRenombrado = path.join(dirEjemplos, "renombrado.txt");
fs.renameSync(archivoCopia, archivoRenombrado);
console.log("Archivo renombrado a:", archivoRenombrado);

// ===== ELIMINAR =====
console.log("\n=== LIMPIEZA ===");

// Eliminar archivos
//fs.unlinkSync(archivoTexto);
//fs.unlinkSync(archivoRenombrado);
//console.log("Archivos eliminados");

// Eliminar directorio
//fs.rmdirSync(dirEjemplos);
//console.log("Directorio eliminado");

console.log("\n✓ Ejemplo completado");
