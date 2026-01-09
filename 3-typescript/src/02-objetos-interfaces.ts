// Ejemplo 2: Objetos, Interfaces y Types
// Tanto las interfaces como los types nos permiten definir la estructura de los objetos

// Definimos una interfaz para un usuario
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

// Creamos un objeto que cumple con la interfaz
const usuario1: Usuario = {
  id: 1,
  nombre: "Juan Pérez",
  email: "juan@example.com",
  activo: true,
};

// Función que recibe un objeto tipado
function mostrarUsuario(usuario: Usuario): void {
  console.log(`ID: ${usuario.id}`);
  console.log(`Nombre: ${usuario.nombre}`);
  console.log(`Email: ${usuario.email}`);
  console.log(`Activo: ${usuario.activo ? "Sí" : "No"}`);
}

mostrarUsuario(usuario1);

// Interface con propiedades opcionales
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descuento?: number; // El signo ? indica que es opcional
}

const producto1: Producto = {
  id: 101,
  nombre: "Laptop",
  precio: 1200,
  // descuento es opcional, no es necesario incluirlo
};

const producto2: Producto = {
  id: 102,
  nombre: "Mouse",
  precio: 25,
  descuento: 10,
};

console.log("\nProductos:");
console.log(producto1);
console.log(producto2);

// ============================================
// TAMBIÉN PODEMOS USAR TYPE EN LUGAR DE INTERFACE
// ============================================

console.log("\n--- Usando Type ---");

// Type para definir estructura de objetos (similar a interface)
type Cliente = {
  id: number;
  nombre: string;
  activo: boolean;
};

const cliente1: Cliente = {
  id: 1,
  nombre: "María García",
  activo: true,
};

console.log("Cliente con type:");
console.log(cliente1);

// Type con propiedades opcionales
type Pedido = {
  id: number;
  producto: string;
  cantidad: number;
  descuento?: number; // Opcional
  nota?: string; // Opcional
};

const pedido1: Pedido = {
  id: 1001,
  producto: "Teclado",
  cantidad: 2,
};

const pedido2: Pedido = {
  id: 1002,
  producto: "Monitor",
  cantidad: 1,
  descuento: 15,
  nota: "Entrega urgente",
};

console.log("\nPedidos con type:");
console.log(pedido1);
console.log(pedido2);

// ============================================
// TYPE: VENTAJAS ADICIONALES
// ============================================

console.log("\n--- Ventajas de Type ---");

// Type puede crear uniones (algo que interface NO puede hacer directamente)
type EstadoPedido = "pendiente" | "enviado" | "entregado" | "cancelado";

type PedidoCompleto = {
  id: number;
  estado: EstadoPedido; // Solo puede ser uno de esos valores
  total: number;
};

const pedido3: PedidoCompleto = {
  id: 1003,
  estado: "enviado", // TypeScript valida que sea uno de los valores permitidos
  total: 250,
};

console.log("Pedido con estado tipado:");
console.log(pedido3);

// Descomentar la siguiente línea causaría un error:
// const pedidoError: PedidoCompleto = { id: 1004, estado: "perdido", total: 100 };
// Error: Type '"perdido"' is not assignable to type 'EstadoPedido'

// ============================================
// RESUMEN: ¿INTERFACE O TYPE?
// ============================================

console.log("\n--- Resumen ---");
console.log("✅ Interface: Ideal para objetos y cuando necesitas extender");
console.log(
  "✅ Type: Más flexible, ideal para uniones, intersecciones y aliases",
);
console.log("💡 Para objetos simples, ambos funcionan igual");
