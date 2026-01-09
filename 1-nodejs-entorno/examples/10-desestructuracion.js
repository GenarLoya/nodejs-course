// Desestructuración de objetos y arrays

console.log("=== DESESTRUCTURACIÓN DE OBJETOS ===");

const usuario = {
  id: 1,
  nombre: "Carlos",
  email: "carlos@ejemplo.com",
  edad: 30,
  ciudad: "Madrid"
};

// Extraer propiedades
const { nombre, email } = usuario;
console.log("Nombre:", nombre);
console.log("Email:", email);

// Renombrar variables
const { nombre: nombreUsuario, edad: años } = usuario;
console.log("Nombre de usuario:", nombreUsuario);
console.log("Años:", años);

// Valores por defecto
const { telefono = "No disponible" } = usuario;
console.log("Teléfono:", telefono);

// Desestructuración en parámetros de función
function mostrarUsuario({ nombre, email, edad = 18 }) {
  console.log(`${nombre} (${edad}): ${email}`);
}

console.log("\nMostrar usuario:");
mostrarUsuario(usuario);

console.log("\n=== DESESTRUCTURACIÓN DE ARRAYS ===");

const numeros = [1, 2, 3, 4, 5];

const [primero, segundo] = numeros;
console.log("Primero:", primero);
console.log("Segundo:", segundo);

// Omitir elementos
const [, , tercero] = numeros;
console.log("Tercero:", tercero);

// Rest operator en arrays
const [uno, dos, ...resto] = numeros;
console.log("Uno:", uno);
console.log("Dos:", dos);
console.log("Resto:", resto);

// Intercambiar variables
let a = 10;
let b = 20;
console.log("\nAntes del intercambio:", { a, b });
[a, b] = [b, a];
console.log("Después del intercambio:", { a, b });
