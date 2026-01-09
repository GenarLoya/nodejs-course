// Estructuras de datos - Objetos

// Crear objeto
const usuario = {
  id: 1,
  nombre: "Ana García",
  email: "ana@ejemplo.com",
  edad: 28,
  activo: true
};

// Acceder a propiedades
console.log("Nombre:", usuario.nombre);
console.log("Email:", usuario["email"]);

// Modificar propiedades
usuario.edad = 29;
usuario.telefono = "555-1234"; // Agregar nueva propiedad

console.log("Usuario modificado:", usuario);

// Métodos en objetos
const producto = {
  nombre: "Laptop",
  precio: 1200,
  stock: 5,
  
  // Método
  calcularDescuento(porcentaje) {
    return this.precio * (1 - porcentaje / 100);
  },
  
  // Método simplificado
  estaDisponible() {
    return this.stock > 0;
  }
};

console.log("Precio con descuento:", producto.calcularDescuento(10));
console.log("¿Está disponible?:", producto.estaDisponible());
