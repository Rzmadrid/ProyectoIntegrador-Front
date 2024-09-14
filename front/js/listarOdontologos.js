const apiURLO = "http://localhost:8080";

// Obtener la referencia a la tabla y al modal
const tableBodyO = document.querySelector("#tablaOdontologos tbody");
//const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editModal = document.getElementById('modal');
const editFormO = document.getElementById("editForm");
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const tableBodyBO = document.querySelector("#tablaBuscarOdontologos tbody");

let currentOdontologoId;

// Cerrar el modal al hacer clic en la "X"
closeModalBtn.addEventListener('click', function() {
  editModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', function(event) {
  if (event.target === editModal) {
    editModal.style.display = 'none';
  }
});

// Función para obtener y mostrar los odontólogos
function fetchOdontologos() {
  // listar los odontologos
  fetch(`${apiURLO}/odontologo/buscartodos`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBodyO.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((odontologo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td>${odontologo.nroMatricula}</td>
              <td>${odontologo.nombre}</td>
              <td>${odontologo.apellido}</td>
              <td>
                <button id="openModalBtn" class="action-btn edit" onclick="editOdontologo(${odontologo.id}, '${odontologo.nroMatricula}','${odontologo.apellido}', '${odontologo.nombre}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteOdontologo(${odontologo.id}, '${odontologo.apellido}', '${odontologo.nombre}')"><i class="fas fa-trash-alt"></i></button>
              </td>
            `;

        tableBodyO.appendChild(row);
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
 
  currentOdontologoId = id;
  document.getElementById("editNroMatricula").value = nroMatricula;
  document.getElementById("editApellidoOdontologo").value = apellido;
  document.getElementById("editNombreOdontologo").value = nombre;
  //editModal.show();
  editModal.style.display = 'flex';
};

// Función para editar un odontologo
editFormO.addEventListener("submit", function (event) {
  event.preventDefault();
  const nroMatricula = document.getElementById("editNroMatricula").value;
  const apellido = document.getElementById("editApellidoOdontologo").value;
  const nombre = document.getElementById("editNombreOdontologo").value;
  console.log(currentOdontologoId + " " + nroMatricula + " " + apellido + " " + nombre);
  //modificar un odontologo
  fetch(`${apiURLO}/odontologo/modificar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentOdontologoId,
      nroMatricula,
      nombre,
      apellido,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Odontologo modificado con éxito");
      fetchOdontologos();
      //editModal.hide();
      editModal.style.display = 'none';
    })
    .catch((error) => {
      console.error("Error editando Odontologo:", error);
    });
});

// Función para eliminar un odontologo
deleteOdontologo = function (id, apellido, nombre) {
  if (confirm("¿Está seguro de que desea eliminar este Odontologo " + nombre + " " + apellido+ "?")) {
    // eliminar el odontologo
    fetch(`${apiURLO}/odontologo/eliminar/${id}`, {
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

const formBO = document.getElementById("buscarOdontologo");

formBO.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreBO = document.getElementById('nombreBO').value;
  const apellidoBO = document.getElementById('apellidoBO').value;

  fetchBuscarOdontologo(nombreBO, apellidoBO);
});


// Función para Buscar Odontologo por Nombre y Apellido
function fetchBuscarOdontologo(nombre, apellido) {
  // listar los odontologos
  fetch(`${apiURLO}/odontologo/buscarNombreApellido?nombre=${nombre}&apellido=${apellido}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBodyBO.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((odontologo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td>${odontologo.nroMatricula}</td>
              <td>${odontologo.nombre}</td>
              <td>${odontologo.apellido}</td>
            `;

          tableBodyBO.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Llamar a la función para obtener y mostrar los odontólogos
fetchOdontologos();
