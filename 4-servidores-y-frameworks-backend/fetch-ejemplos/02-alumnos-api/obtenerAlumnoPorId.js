async function fetchAlumnoById(id) {
  const res = await fetch(`http://localhost:3001/alumnos/${id}`);

  if (!res.ok) {
    const err = await res.json();
    console.log("Error:", err);
    return;
  }

  const data = await res.json();
  console.log(data);
}

// Ejemplo
fetchAlumnoById(1);
