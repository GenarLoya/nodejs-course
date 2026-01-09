// Ejemplo práctico aplicado al backend - Sistema de tareas

// Simulación de base de datos
const tareas = [
  { id: 1, titulo: "Comprar leche", completada: false, prioridad: "alta" },
  { id: 2, titulo: "Estudiar Node.js", completada: false, prioridad: "alta" },
  { id: 3, titulo: "Hacer ejercicio", completada: true, prioridad: "media" },
  { id: 4, titulo: "Leer libro", completada: false, prioridad: "baja" }
];

// Función para obtener todas las tareas
function obtenerTareas() {
  return tareas;
}

// Función para obtener tareas pendientes
function obtenerTareasPendientes() {
  return tareas.filter(tarea => !tarea.completada);
}

// Función para obtener tarea por ID
function obtenerTareaPorId(id) {
  return tareas.find(tarea => tarea.id === id);
}

// Función para crear nueva tarea
function crearTarea({ titulo, prioridad = "media" }) {
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    completada: false,
    prioridad
  };
  tareas.push(nuevaTarea);
  return nuevaTarea;
}

// Función para marcar como completada
function completarTarea(id) {
  const tarea = obtenerTareaPorId(id);
  if (tarea) {
    tarea.completada = true;
    return tarea;
  }
  return null;
}

// Función para obtener tareas por prioridad
function obtenerTareasPorPrioridad(prioridad) {
  return tareas.filter(tarea => tarea.prioridad === prioridad);
}

// Uso
console.log("=== TODAS LAS TAREAS ===");
console.log(obtenerTareas());

console.log("\n=== TAREAS PENDIENTES ===");
console.log(obtenerTareasPendientes());

console.log("\n=== TAREA POR ID ===");
console.log(obtenerTareaPorId(2));

console.log("\n=== CREAR NUEVA TAREA ===");
const nuevaTarea = crearTarea({ titulo: "Aprender Express", prioridad: "alta" });
console.log("Nueva tarea:", nuevaTarea);

console.log("\n=== COMPLETAR TAREA ===");
const tareaCompletada = completarTarea(1);
console.log("Tarea completada:", tareaCompletada);

console.log("\n=== TAREAS DE ALTA PRIORIDAD ===");
console.log(obtenerTareasPorPrioridad("alta"));

console.log("\n=== TAREAS ACTUALIZADAS ===");
console.log(obtenerTareas());
