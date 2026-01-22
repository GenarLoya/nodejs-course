async function updateTodo(id, data) {
  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al actualizar TODO");
  }

  const updated = await res.json();
  console.log("TODO actualizado:", updated);
}

// Ejemplos
updateTodo(1, { completed: true });
