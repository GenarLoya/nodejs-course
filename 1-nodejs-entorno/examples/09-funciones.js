// Funciones en JavaScript

// Declaración de función (hoisted)
function sumar(a, b) {
  return a + b;
}

// Expresión de función
const restar = function(a, b) {
  return a - b;
};

// Arrow function (sintaxis moderna)
const multiplicar = (a, b) => {
  return a * b;
};

// Arrow function simplificada (return implícito)
const dividir = (a, b) => a / b;

// Un solo parámetro (sin paréntesis)
const cuadrado = x => x * x;

// Sin parámetros
const obtenerFechaActual = () => new Date();

console.log("Sumar:", sumar(5, 3));
console.log("Restar:", restar(10, 4));
console.log("Multiplicar:", multiplicar(6, 7));
console.log("Dividir:", dividir(20, 4));
console.log("Cuadrado de 5:", cuadrado(5));
console.log("Fecha actual:", obtenerFechaActual());

// Parámetros por defecto
function saludar(nombre = "Invitado") {
  return `Hola, ${nombre}!`;
}

console.log("\nSaludos:");
console.log(saludar());
console.log(saludar("Ana"));

// Rest parameters (parámetros variables)
function sumarTodos(...numeros) {
  return numeros.reduce((acc, num) => acc + num, 0);
}

console.log("\nSumar todos:", sumarTodos(1, 2, 3, 4, 5));

// Funciones como ciudadanos de primera clase
const operaciones = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b
};

function ejecutarOperacion(a, b, operacion) {
  return operacion(a, b);
}

console.log("\nEjecutar operación:", ejecutarOperacion(10, 5, operaciones.sumar));
