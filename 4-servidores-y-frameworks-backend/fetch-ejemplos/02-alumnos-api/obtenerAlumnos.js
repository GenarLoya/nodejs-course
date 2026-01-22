async function fetchAlumnos() {
  const res = await fetch("http://localhost:3001/alumnos");

  if (!res.ok) {
    const err = await res.json();
    console.log("Error:", err);
    return;
  }

  const data = await res.json();
  console.log(data);
}

fetchAlumnos();
