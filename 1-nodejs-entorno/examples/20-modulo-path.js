// Módulo path - Manejo de rutas

const path = require('path');

console.log("=== MÓDULO PATH ===\n");

// ===== UNIR RUTAS =====
console.log("=== UNIR RUTAS ===");

const rutaArchivo = path.join('carpeta', 'subcarpeta', 'archivo.txt');
console.log("join:", rutaArchivo);

const rutaCompleta = path.join(__dirname, 'datos', 'usuarios.json');
console.log("join con __dirname:", rutaCompleta);

const rutaAbsoluta = path.resolve('carpeta', 'archivo.txt');
console.log("resolve:", rutaAbsoluta);

// ===== INFORMACIÓN DE RUTAS =====
console.log("\n=== INFORMACIÓN DE RUTAS ===");

const archivo = '/home/usuario/proyecto/src/index.js';

console.log("Ruta completa:", archivo);
console.log("basename:", path.basename(archivo));
console.log("basename sin ext:", path.basename(archivo, '.js'));
console.log("dirname:", path.dirname(archivo));
console.log("extname:", path.extname(archivo));

// Parsear ruta completa
const info = path.parse(archivo);
console.log("\npath.parse():", info);

// ===== CONSTRUIR RUTA DESDE OBJETO =====
console.log("\n=== CONSTRUIR RUTA ===");

const nuevaRuta = path.format({
  dir: '/home/usuario/proyecto',
  base: 'app.js'
});
console.log("format:", nuevaRuta);

// ===== NORMALIZAR RUTAS =====
console.log("\n=== NORMALIZAR RUTAS ===");

console.log("normalize:", path.normalize('/carpeta//subcarpeta/../archivo.txt'));
console.log("normalize:", path.normalize('foo/bar//baz/asdf/quux/..'));

// ===== VERIFICAR SI ES ABSOLUTA =====
console.log("\n=== VERIFICAR TIPO DE RUTA ===");

console.log("isAbsolute('/home/user'):", path.isAbsolute('/home/usuario/archivo.txt'));
console.log("isAbsolute('carpeta/archivo'):", path.isAbsolute('carpeta/archivo.txt'));

// ===== VARIABLES ESPECIALES =====
console.log("\n=== VARIABLES ESPECIALES ===");

console.log("__dirname:", __dirname);
console.log("__filename:", __filename);
console.log("process.cwd():", process.cwd());

// ===== SEPARADOR DE RUTAS =====
console.log("\n=== SEPARADORES ===");

console.log("path.sep:", path.sep);
console.log("path.delimiter:", path.delimiter);

// ===== RUTAS RELATIVAS =====
console.log("\n=== RUTAS RELATIVAS ===");

const desde = '/home/usuario/proyecto/src';
const hasta = '/home/usuario/proyecto/dist/bundle.js';
console.log("relative:", path.relative(desde, hasta));
