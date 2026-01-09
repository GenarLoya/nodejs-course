// Ejemplo 5: Módulos Nativos de Node.js con TypeScript
// TypeScript funciona perfectamente con los módulos nativos de Node.js

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

console.log("=== Usando Módulos de Node.js con TypeScript ===\n");

// 1. Módulo OS - Información del sistema
console.log("1. Información del Sistema (os):");
console.log(`   Sistema Operativo: ${os.platform()}`);
console.log(`   Arquitectura: ${os.arch()}`);
console.log(`   CPUs: ${os.cpus().length} núcleos`);
console.log(`   Memoria Total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`   Memoria Libre: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`);

// 2. Módulo Path - Manejo de rutas
console.log("\n2. Manejo de Rutas (path):");
const archivoActual: string = __filename;
const directorioActual: string = __dirname;

console.log(`   Archivo actual: ${path.basename(archivoActual)}`);
console.log(`   Directorio actual: ${path.basename(directorioActual)}`);
console.log(`   Extensión: ${path.extname(archivoActual)}`);

// Crear una ruta de forma segura
const rutaArchivo: string = path.join(directorioActual, '..', 'README.md');
console.log(`   Ruta construida: ${rutaArchivo}`);

// 3. Módulo FS - Sistema de archivos
console.log("\n3. Sistema de Archivos (fs):");

// Verificar si existe un archivo
const existeReadme: boolean = fs.existsSync(rutaArchivo);
console.log(`   ¿Existe README.md?: ${existeReadme ? "Sí" : "No"}`);

if (existeReadme) {
  // Leer información del archivo
  const stats: fs.Stats = fs.statSync(rutaArchivo);
  console.log(`   Tamaño: ${stats.size} bytes`);
  console.log(`   ¿Es un archivo?: ${stats.isFile()}`);
  console.log(`   ¿Es un directorio?: ${stats.isDirectory()}`);
}

// Función tipada que lee un archivo
function leerArchivo(ruta: string): string | null {
  try {
    const contenido: string = fs.readFileSync(ruta, 'utf-8');
    return contenido;
  } catch (error) {
    console.error(`   Error al leer archivo: ${error}`);
    return null;
  }
}

// Función tipada que lista archivos de un directorio
function listarArchivos(directorio: string): string[] {
  try {
    const archivos: string[] = fs.readdirSync(directorio);
    return archivos;
  } catch (error) {
    console.error(`   Error al listar directorio: ${error}`);
    return [];
  }
}

console.log("\n4. Listando archivos en src/:");
const archivosEnSrc: string[] = listarArchivos(directorioActual);
archivosEnSrc.forEach((archivo: string) => {
  if (archivo.endsWith('.ts')) {
    console.log(`   📄 ${archivo}`);
  }
});

console.log("\n✅ TypeScript + Node.js funcionando correctamente!");
