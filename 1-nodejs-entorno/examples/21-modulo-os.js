// Módulo os - Información del sistema operativo

const os = require('os');

console.log("=== MÓDULO OS - SISTEMA OPERATIVO ===\n");

// ===== INFORMACIÓN DEL SISTEMA =====
console.log("=== INFORMACIÓN DEL SISTEMA ===");

console.log("Plataforma:", os.platform());
console.log("Arquitectura:", os.arch());
console.log("Versión:", os.release());
console.log("Tipo:", os.type());
console.log("Hostname:", os.hostname());

// ===== INFORMACIÓN DE MEMORIA =====
console.log("\n=== INFORMACIÓN DE MEMORIA ===");

const memoriaTotal = os.totalmem();
const memoriaLibre = os.freemem();
const memoriaUsada = memoriaTotal - memoriaLibre;

console.log("Memoria total:", (memoriaTotal / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Memoria libre:", (memoriaLibre / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Memoria usada:", (memoriaUsada / 1024 / 1024 / 1024).toFixed(2), "GB");

const porcentajeUso = ((memoriaUsada / memoriaTotal) * 100).toFixed(2);
console.log("Uso de memoria:", porcentajeUso, "%");

// ===== INFORMACIÓN DE CPU =====
console.log("\n=== INFORMACIÓN DE CPU ===");

const cpus = os.cpus();
console.log("Número de CPUs:", cpus.length);
console.log("Modelo:", cpus[0].model);
console.log("Velocidad:", cpus[0].speed, "MHz");

// Mostrar info de cada CPU
console.log("\nDetalle de CPUs:");
cpus.forEach((cpu, index) => {
  console.log(`CPU ${index}: ${cpu.model} @ ${cpu.speed} MHz`);
});

// ===== INFORMACIÓN DE USUARIO =====
console.log("\n=== INFORMACIÓN DE USUARIO ===");

const userInfo = os.userInfo();
console.log("Usuario:", userInfo.username);
console.log("Home:", userInfo.homedir);
console.log("Shell:", userInfo.shell);

// ===== DIRECTORIOS DEL SISTEMA =====
console.log("\n=== DIRECTORIOS DEL SISTEMA ===");

console.log("Directorio temporal:", os.tmpdir());
console.log("Directorio home:", os.homedir());

// ===== TIEMPO DE ACTIVIDAD =====
console.log("\n=== TIEMPO DE ACTIVIDAD ===");

const uptime = os.uptime();
const horas = Math.floor(uptime / 3600);
const minutos = Math.floor((uptime % 3600) / 60);
console.log("Uptime:", uptime, "segundos");
console.log("Uptime:", `${horas}h ${minutos}m`);

// ===== INTERFACES DE RED =====
console.log("\n=== INTERFACES DE RED ===");

const interfaces = os.networkInterfaces();
console.log("Interfaces disponibles:", Object.keys(interfaces));

// Mostrar IPs
Object.keys(interfaces).forEach(interfaz => {
  const ips = interfaces[interfaz].filter(i => i.family === 'IPv4');
  if (ips.length > 0) {
    console.log(`${interfaz}:`, ips[0].address);
  }
});

// ===== CONSTANTES DEL SISTEMA =====
console.log("\n=== CONSTANTES ===");

console.log("EOL (fin de línea):", JSON.stringify(os.EOL));
console.log("Prioridades:", Object.keys(os.constants.priority));
