// Obtener los elementos del DOM
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');

// Abrir el modal al hacer clic en el botón
openModalBtn.addEventListener('click', function() {
  modal.style.display = 'flex';
});

// Cerrar el modal al hacer clic en la "X"
closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Simular la actualización de datos al enviar el formulario
document.getElementById('editForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir la acción por defecto

  // Aquí puedes agregar la lógica para actualizar los datos del odontólogo
  alert('Cambios guardados exitosamente');

  // Cerrar el modal después de guardar los cambios
  modal.style.display = 'none';
});
