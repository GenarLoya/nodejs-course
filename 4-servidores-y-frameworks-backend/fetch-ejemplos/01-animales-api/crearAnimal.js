const createAnimal = async () => {
  try {
    const response = await fetch("http://localhost:3000/animales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: "Luna",
        especie: "Perro",
      }),
    });

    console.log(response.status);

    if (!response.ok) {
      throw new Error("Error al crear el animal");
    }

    const data = await response.json();
    console.log("Animal creado:", data);
  } catch (error) {
    console.error(error);
  }
};

createAnimal();
