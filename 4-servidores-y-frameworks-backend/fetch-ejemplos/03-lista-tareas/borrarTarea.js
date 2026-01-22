async function deleteTodo(id) {
  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al borrar TODO");
  }

  console.log(`TODO ${id} eliminado`);
}

// Ejemplo
deleteTodo(1);
