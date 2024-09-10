const form = document.getElementById("agregarForm");
const apiURL = "http://localhost:8080";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const paciente_id = document.getElementById("idPaciente").value;
  const odontologo_id = document.getElementById("idOdontologo").value;
  const fecha = document.getElementById("fecha").value;

  // llamando al endpoint de agregar
  const datosFormulario = {
    paciente_id,
    odontologo_id,
    fecha,
  };

  fetch(`${apiURL}/turnos/guardar`, {
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
      form.reset(); // Resetear el formulario
    })
    .catch((error) => {
      console.error("Error agregando Turno:", error);
    });
});
