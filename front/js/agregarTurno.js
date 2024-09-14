const formT = document.getElementById("agregarTurno");
const apiURLT = "http://localhost:8080";

formT.addEventListener("submit", function (event) {
  event.preventDefault();

  const paciente_id = document.getElementById("idPaciente").value;
  const odontologo_id = document.getElementById("idOdontologo").value;
  const fechaT = document.getElementById("fechaTurno").value;

  // llamando al endpoint de agregar
  const datosFormulario = {
    paciente_id,
    odontologo_id,
    fecha: fechaT,
  };

  fetch(`${apiURLT}/turnos/guardar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosFormulario),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Turno agregado con éxito");
      formT.reset(); // Resetear el formulario
      fetchTurnos();
    })
    .catch((error) => {
      console.error("Error agregando Turno:", error);
    });
});
