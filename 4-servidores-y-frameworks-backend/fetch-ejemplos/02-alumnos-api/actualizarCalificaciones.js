async function upsertCalificacion(id, materia, calificacion) {
  const res = await fetch(
    `http://localhost:3001/alumnos/${id}/calificaciones`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        materia,
        calificacion,
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json();
    console.log("Errors", err);
    return;
  }

  const data = await res.json();
  console.log("Calificaciones actualizadas:", data);
}

// Ejemplos
upsertCalificacion(1, "Matemáticas", 9);
upsertCalificacion(1, "Historia", 8.5);
upsertCalificacion(1, "Matemáticas", 10); // sobrescribe
