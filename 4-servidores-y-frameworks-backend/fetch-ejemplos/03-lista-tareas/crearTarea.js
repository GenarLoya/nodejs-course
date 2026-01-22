async function createTodo(title) {
  const res = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al crear TODO");
  }

  const todo = await res.json();
  console.log("TODO creado:", todo);
}

// Ejemplo
createTodo("Aprender Express + Zod");
