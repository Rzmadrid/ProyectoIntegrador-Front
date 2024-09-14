const apiURLTL = "http://localhost:8080";

// Obtener la referencia a la tabla y al modal
const tableBodyT = document.querySelector("#tablaTurnos tbody");
//const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editModalT = document.getElementById('modalTurno');
const editFormT = document.getElementById("editFormT");
const openModalBtnT = document.getElementById('openModalBtnT');
const closeModalBtnT = document.getElementById('closeModalBtnT');
const tableBodyBT = document.querySelector("#tablaBuscarTurno tbody");
let currentTurnoId;

// Cerrar el modal al hacer clic en la "X"
closeModalBtnT.addEventListener('click', function() {
  editModalT.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', function(event) {
  if (event.target === editModalT) {
    editModalT.style.display = 'none';
  }
});

// Función para obtener y mostrar los turnos
function fetchTurnos() {
  // listar los turnos
  fetch(`${apiURLTL}/turnos/buscartodos`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBodyT.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((turno, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td>${turno.pacienteResponseDto.nombre} &nbsp ${turno.pacienteResponseDto.apellido}</td>
              <td>${turno.odontologoResponseDto.nombre} &nbsp ${turno.odontologoResponseDto.apellido}</td>
              <td>${turno.fecha}</td>
              <td>
                <button id="openModalBtnT" class="action-btn edit" onclick="editTurno(${turno.id}, '${turno.pacienteResponseDto.id}','${turno.odontologoResponseDto.id}', '${turno.fecha}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteTurno(${turno.id})"><i class="fas fa-trash-alt"></i></button>
              </td>
            `;

        tableBodyT.appendChild(row);
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
  document.getElementById("editIdPaciente").value = paciente_id;
  document.getElementById("editIdOdontologo").value = odontologo_id;
  document.getElementById("editFechaTurno").value = fecha;
  //editModalT.show();
  editModalT.style.display = 'flex';
};

// Función para editar un turno
editFormT.addEventListener("submit", function (event) {
  event.preventDefault();
  const paciente_id = document.getElementById("editIdPaciente").value;
  const odontologo_id = document.getElementById("editIdOdontologo").value;
  const fecha = document.getElementById("editFechaTurno").value;

  //modificar un turno
  fetch(`${apiURLTL}/turnos/modificar`, {
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
      fetchTurnos();
      //editModalT.hide();
      editModalT.style.display = 'none';
    })
    .catch((error) => {
      console.error("Error editando Turno:", error);
    });
});

// Función para eliminar un turno
deleteTurno = function (id) {
  if (confirm("¿Está seguro de que desea eliminar este Turno?")) {
    // eliminar el Turno
    fetch(`${apiURLTL}/turnos/eliminar/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Turno eliminado con éxito");
        fetchTurnos();
      })
      .catch((error) => {
        console.error("Error borrando Turno:", error);
      });
  }
};

const formBT = document.getElementById("buscarTurno");

formBT.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreT= document.getElementById('nombreT').value;
  const apellidoT = document.getElementById('apellidoT').value;

  fetchBuscarTurno(nombreT, apellidoT);
});


// Función para Buscar turno por Nombre y Apellido de paciente
function fetchBuscarTurno(nombre, apellido) {
  // listar los odontologos
  fetch(`${apiURLT}/turnos/buscarNombreApellido?nombre=${nombre}&apellido=${apellido}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBodyBT.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((turno, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td>${turno.id}</td>
              <td>${turno.fecha}</td>
            `;

          tableBodyBT.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
// Llamar a la función para obtener y mostrar los Turnos
fetchTurnos();
