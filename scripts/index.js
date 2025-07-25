
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__close');

editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});





const editForm = document.forms['edit-form'];
const nameInput = editForm.elements['name'];
const descriptionInput = editForm.elements['description'];
const submitButton = editForm.querySelector('.popup__button');
const MIN_INPUT_LENGTH = 2;

function toggleSubmitButton() {
  const isNameValid = nameInput.value.trim().length >= MIN_INPUT_LENGTH && nameInput.validity.valid;
  const isDescriptionValid = descriptionInput.value.trim().length >= MIN_INPUT_LENGTH  && descriptionInput.validity.valid;

  submitButton.disabled = !(isNameValid && isDescriptionValid);
}


nameInput.addEventListener('input', toggleSubmitButton);
descriptionInput.addEventListener('input', toggleSubmitButton);

editForm.addEventListener('reset', () => {
  submitButton.disabled = true;
});
const profileTitle = document.querySelector('.profile__name');       
const profileDescription = document.querySelector('.profile__profession'); 


editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  popup.classList.remove('popup_opened'); 
});

window.addEventListener('DOMContentLoaded', toggleSubmitButton);

const botonesLike = document.querySelectorAll('.gallery__like-button');
botonesLike.forEach((boton) => {
  boton.addEventListener('click', () => {
    boton.classList.toggle('gallery__like-button_active');
  });
});
