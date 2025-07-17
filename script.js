// Abrir y cerrar el popup
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__close');

editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});


// === Validación del formulario y activación del botón "Guardar" ===

// Selección de elementos
const editForm = document.forms['edit-form'];
const nameInput = editForm.elements['name'];
const descriptionInput = editForm.elements['description'];
const submitButton = editForm.querySelector('.popup__button');

// Función para validar campos en tiempo real
function toggleSubmitButton() {
  const isNameValid = nameInput.value.trim().length >= 2 && nameInput.validity.valid;
  const isDescriptionValid = descriptionInput.value.trim().length >= 2 && descriptionInput.validity.valid;

  submitButton.disabled = !(isNameValid && isDescriptionValid);
}

// Escucha eventos en los inputs
nameInput.addEventListener('input', toggleSubmitButton);
descriptionInput.addEventListener('input', toggleSubmitButton);

// Asegura que el botón esté desactivado si se resetea el formulario
editForm.addEventListener('reset', () => {
  submitButton.disabled = true;
});

// Al cargar la página, valida el estado inicial
window.addEventListener('DOMContentLoaded', toggleSubmitButton);
