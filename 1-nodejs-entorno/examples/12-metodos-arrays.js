// Métodos de arrays esenciales

const usuarios = [
  { id: 1, nombre: "Ana", edad: 25, activo: true },
  { id: 2, nombre: "Luis", edad: 30, activo: false },
  { id: 3, nombre: "María", edad: 28, activo: true },
  { id: 4, nombre: "Carlos", edad: 35, activo: true }
];

console.log("=== 1. map() - Transformar elementos ===");
const nombres = usuarios.map(usuario => usuario.nombre);
console.log("Nombres:", nombres);

const usuariosConSaludo = usuarios.map(usuario => ({
  ...usuario,
  saludo: `Hola, soy ${usuario.nombre}`
}));
console.log("Con saludo:", usuariosConSaludo[0]);

console.log("\n=== 2. filter() - Filtrar elementos ===");
const usuariosActivos = usuarios.filter(usuario => usuario.activo);
console.log("Usuarios activos:", usuariosActivos);

const mayoresDe28 = usuarios.filter(usuario => usuario.edad > 28);
console.log("Mayores de 28:", mayoresDe28);

console.log("\n=== 3. find() - Encontrar un elemento ===");
const usuario = usuarios.find(u => u.id === 2);
console.log("Usuario con id 2:", usuario);

const usuarioInexistente = usuarios.find(u => u.id === 999);
console.log("Usuario inexistente:", usuarioInexistente);

console.log("\n=== 4. findIndex() - Encontrar índice ===");
const indice = usuarios.findIndex(u => u.nombre === "María");
console.log("Índice de María:", indice);

console.log("\n=== 5. reduce() - Acumular valores ===");
const edadTotal = usuarios.reduce((suma, usuario) => {
  return suma + usuario.edad;
}, 0);
console.log("Edad total:", edadTotal);
console.log("Edad promedio:", edadTotal / usuarios.length);

// Agrupar por propiedad
const porEstado = usuarios.reduce((acc, usuario) => {
  const key = usuario.activo ? "activos" : "inactivos";
  if (!acc[key]) acc[key] = [];
  acc[key].push(usuario);
  return acc;
}, {});
console.log("Agrupados:", porEstado);

console.log("\n=== 6. some() - ¿Alguno cumple? ===");
const hayMenoresDe30 = usuarios.some(u => u.edad < 30);
console.log("¿Hay menores de 30?:", hayMenoresDe30);

console.log("\n=== 7. every() - ¿Todos cumplen? ===");
const todosMayoresDeEdad = usuarios.every(u => u.edad >= 18);
console.log("¿Todos mayores de edad?:", todosMayoresDeEdad);

console.log("\n=== 8. forEach() - Iterar ===");
usuarios.forEach(usuario => {
  console.log(`${usuario.nombre}: ${usuario.edad} años`);
});

console.log("\n=== 9. sort() - Ordenar ===");
const numerosDesordenados = [5, 2, 8, 1, 9];
numerosDesordenados.sort((a, b) => a - b);
console.log("Números ordenados:", numerosDesordenados);

// Ordenar objetos por edad
const usuariosOrdenados = [...usuarios].sort((a, b) => a.edad - b.edad);
console.log("Usuarios por edad:", usuariosOrdenados.map(u => `${u.nombre} (${u.edad})`));

console.log("\n=== 10. Encadenar métodos ===");
const resultado = usuarios
  .filter(u => u.activo)
  .map(u => ({ ...u, esAdulto: u.edad >= 18 }))
  .sort((a, b) => b.edad - a.edad)
  .slice(0, 2);

console.log("Resultado encadenado:", resultado);
