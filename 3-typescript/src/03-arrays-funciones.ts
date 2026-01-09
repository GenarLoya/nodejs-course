// Ejemplo 3: Arrays y Funciones Tipadas
// TypeScript permite tipar arrays y definir tipos específicos para funciones

// Arrays tipados
const numeros: number[] = [1, 2, 3, 4, 5];
const nombres: string[] = ["Ana", "Luis", "Carlos"];
const activos: boolean[] = [true, false, true];

console.log("Arrays tipados:");
console.log("Números:", numeros);
console.log("Nombres:", nombres);
console.log("Activos:", activos);

// Array de objetos con interface
interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

const tareas: Tarea[] = [
  { id: 1, titulo: "Aprender TypeScript", completada: true },
  { id: 2, titulo: "Configurar proyecto", completada: true },
  { id: 3, titulo: "Crear API REST", completada: false }
];

console.log("\nTareas:");
tareas.forEach(tarea => {
  console.log(`[${tarea.completada ? "✓" : " "}] ${tarea.titulo}`);
});

// Funciones con tipos de parámetros y retorno
function sumar(a: number, b: number): number {
  return a + b;
}

function multiplicar(a: number, b: number): number {
  return a * b;
}

console.log("\nOperaciones:");
console.log(`5 + 3 = ${sumar(5, 3)}`);
console.log(`5 * 3 = ${multiplicar(5, 3)}`);

// Función con parámetros opcionales
function saludar(nombre: string, edad?: number): string {
  if (edad) {
    return `Hola ${nombre}, tienes ${edad} años`;
  }
  return `Hola ${nombre}`;
}

console.log("\nSaludos:");
console.log(saludar("María"));
console.log(saludar("Pedro", 25));

// Función con valores por defecto
function crearMensaje(texto: string, prefijo: string = "INFO"): string {
  return `[${prefijo}] ${texto}`;
}

console.log("\nMensajes:");
console.log(crearMensaje("Servidor iniciado"));
console.log(crearMensaje("Error en la conexión", "ERROR"));
