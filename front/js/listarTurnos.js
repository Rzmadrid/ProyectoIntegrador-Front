const apiURL = "http://localhost:8080";

// Obtener la referencia a la tabla y al modal
const tableBody = document.querySelector("#turnosTable tbody");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editForm = document.getElementById("editForm");
let currentTurnoId;

// Función para obtener y mostrar los turnos
function fetchTurnos() {
  // listar los turnos
  fetch(`${apiURL}/turnos/buscartodos`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBody.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((turno, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td>${turno.id}</td>
              <td>${turno.paciente_id}</td>
              <td>${turno.odontologo_id}</td>
              <td>${turno.fecha}</td>
              <td>
                <button class="btn btn-primary btn-sm" onclick="editPaciente(${turno.id}, '${turno.paciente_id}','${turno.odontologo_id}', '${turno.fecha}')">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="deletePaciente(${turno.id})">Eliminar</button>
              </td>
            `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Función para abrir el modal y cargar los datos del turno
editTurno = function (
  id,
  paciente_id,
    odontologo_id,
    fecha
) {
  currentTurnoId = id;
  document.getElementById("editPaciente_id").value = paciente_id;
  document.getElementById("editOdontologo:_id").value = odontologo_id;
  document.getElementById("editFecha").value = fecha;
  editModal.show();
};

// Función para editar un turno
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const paciente_id = document.getElementById("editPaciente_id").value;
  const odontologo_id = document.getElementById("editOdontologo_id").value;
  const fecha = document.getElementById("editFecha").value;

  //modificar un turno
  fetch(`${apiURL}/turnos/modificar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentTurnoId,
      paciente_id,
      odontologo_id,
      fecha,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Turno modificado con éxito");
      fetchPacientes();
      editModal.hide();
    })
    .catch((error) => {
      console.error("Error editando Turno:", error);
    });
});

// Función para eliminar un turno
deleteTurno = function (id) {
  if (confirm("¿Está seguro de que desea eliminar este Turno?")) {
    // eliminar el Turno
    fetch(`${apiURL}/turnos/eliminar/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Turno eliminado con éxito");
        fetchPacientes();
      })
      .catch((error) => {
        console.error("Error borrando Turno:", error);
      });
  }
};

// Llamar a la función para obtener y mostrar los Turnos
fetchTurnos();
