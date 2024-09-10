const apiURL = "http://localhost:8080";

// Obtener la referencia a la tabla y al modal
const tableBody = document.querySelector("#tablaOdontologos tbody");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editForm = document.getElementById("editForm");
let currentOdontologoId;

// Función para obtener y mostrar los odontólogos
function fetchOdontologos() {
  // listar los odontologos
  fetch(`${apiURL}/odontologo/buscartodos`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBody.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((odontologo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td>${odontologo.nroMatricula}</td>
              <td>${odontologo.apellido}</td>
              <td>${odontologo.nombre}</td>
              <td>
                <button class="btn btn-primary btn-sm" onclick="editOdontologo(${odontologo.id}, '${odontologo.nroMatricula}','${odontologo.apellido}', '${odontologo.nombre}')">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteOdontologo(${odontologo.id})">Eliminar</button>
              </td>
            `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Función para abrir el modal y cargar los datos del odontologo
editOdontologo = function (
  id,
  nroMatricula,
  apellido,
  nombre
) {
  currentPacienteId = id;
  document.getElementById("editNroMatricula").value = nroMatricula;
  document.getElementById("editApellido").value = apellido;
  document.getElementById("editNombre").value = nombre;
  editModal.show();
};

// Función para editar un odontologo
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const apellido = document.getElementById("editNroMatricula").value;
  const nombre = document.getElementById("editApellido").value;
  const dni = document.getElementById("editNombre").value;

  //modificar un odontologo
  fetch(`${apiURL}/odontologo/modificar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentOdontologoId,
      nroMatricula,
      apellido,
      nombre,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Odontologo modificado con éxito");
      fetchOdontologos();
      editModal.hide();
    })
    .catch((error) => {
      console.error("Error editando Odontologo:", error);
    });
});

// Función para eliminar un odontologo
deleteOdontologo = function (id) {
  if (confirm("¿Está seguro de que desea eliminar este Odontologo?")) {
    // eliminar el odontologo
    fetch(`${apiURL}/odontologo/eliminar/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Odontologo eliminado con éxito");
        fetchOdontologos();
      })
      .catch((error) => {
        console.error("Error borrando Odontologo:", error);
      });
  }
};

// Llamar a la función para obtener y mostrar los odontólogos
fetchOdontologos();
