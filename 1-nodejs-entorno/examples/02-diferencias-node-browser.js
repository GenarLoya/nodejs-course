// Diferencias entre Node.js y el navegador

console.log("=== Objetos disponibles en Node.js ===");

// ✅ Solo en Node.js
console.log("global:", typeof global);
console.log("process:", typeof process);
console.log("__dirname:", __dirname);
console.log("__filename:", __filename);

// Información del proceso
console.log("\n=== Información del proceso ===");
console.log("Directorio de trabajo:", process.cwd());
console.log("Versión de Node:", process.version);
console.log("Plataforma:", process.platform);
console.log("Usuario:", process.env.USER || process.env.USERNAME);

// ✅ Disponible en ambos
console.log("\n=== Funciones comunes ===");
console.log("console.log funciona ✓");

setTimeout(() => {
  console.log("setTimeout funciona ✓");
}, 100);

// Solo en browser
console.log("\n=== Objetos disponibles solo en el navegador ===");
console.log("window:", typeof window);
console.log("document:", typeof document);
console.log("navigator:", typeof navigator);
