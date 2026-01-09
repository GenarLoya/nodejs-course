const nombre: string = "Node.js";
const version: number = 20;
const esModerno: boolean = true;

function saludar(lenguaje: string): string {
  return `¡Hola desde ${lenguaje}!`;
}

const mensaje = saludar(nombre);
console.log(mensaje);
console.log(`Versión: ${version}`);
console.log(`¿Es moderno?: ${esModerno}`);
