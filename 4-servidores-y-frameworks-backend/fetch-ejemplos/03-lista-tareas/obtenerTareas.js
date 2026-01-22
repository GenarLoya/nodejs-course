async function fetchTodos() {
  const res = await fetch("http://localhost:3000/todos");

  if (!res.ok) {
    throw new Error("Error al obtener los TODOs");
  }

  const todos = await res.json();
  console.log(todos);
}

fetchTodos();
