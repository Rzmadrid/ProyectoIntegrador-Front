const formO = document.getElementById("agregarOdontologo");
const apiURLAO= "http://localhost:8080";

formO.addEventListener("submit", function (event) {
  event.preventDefault();

  const nroMatricula = document.getElementById("nroMatricula").value;
  const apellido = document.getElementById("apellidoOdontologo").value;
  const nombre = document.getElementById("nombreOdontologo").value;

  // llamando al endpoint de agregar
  const datosFormulario = {
    nroMatricula,
    nombre,
    apellido,
  };

  fetch(`${apiURLAO}/odontologo/guardar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosFormulario),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Odontologo agregado con éxito");
      formO.reset(); // Resetear el formulario
      fetchOdontologos();
    })
    .catch((error) => {
      console.error("Error agregando Odontologo:", error);
    });
});
