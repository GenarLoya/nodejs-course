// Primer script completo con Node.js
console.log("=== Mi Primera Aplicación Node.js ===");

function calcularAreaCirculo(radio) {
  return Math.PI * radio ** 2;
}

const radio = 5;
const area = calcularAreaCirculo(radio);

console.log(`El área de un círculo con radio ${radio} es: ${area.toFixed(2)}`);
