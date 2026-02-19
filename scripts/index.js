
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
const nameError = document.querySelector(".name-error");
const descriptionError = document.querySelector(".description-error");
const MIN_INPUT_LENGTH = 2;

function checkInputValidity(inputElement, errorElement) {
  if (!inputElement.validity.valid) { 
    errorElement.textContent = inputElement.validationMessage;
  } else {
    errorElement.textContent = "";
  }
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}



function toggleSubmitButton() {
  const isNameValid = nameInput.value.trim().length >= MIN_INPUT_LENGTH && nameInput.validity.valid;
  const isDescriptionValid = descriptionInput.value.trim().length >= MIN_INPUT_LENGTH  && descriptionInput.validity.valid;

  submitButton.disabled = !(isNameValid && isDescriptionValid);
}


nameInput.addEventListener('input', () => {
  checkInputValidity(nameInput, nameError);
   toggleSubmitButton();
});

descriptionInput.addEventListener('input', () => {
  checkInputValidity(descriptionInput, descriptionError);
  toggleSubmitButton();
});

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

const addButton = document.querySelector('.profile__add-button');

const addPopup = document.querySelector('.popup_type_add');

addButton.addEventListener('click', () => {
  addPopup.classList.add('popup_opened');
  toggleAddButton();
});
addPopup.querySelector('.popup__close').addEventListener('click', () => {
  addPopup.classList.remove('popup_opened')
});


popup.addEventListener('mousedown', handleOverlayClick);
addPopup.addEventListener('mousedown', handleOverlayClick);

document.addEventListener('keydown', handleEscClose);

const addForm = document.forms['add-form'];


const titleInput = addForm.elements['title'];
const linkInput = addForm.elements['link'];

const addSubmitButton = addForm.querySelector('.popup__button');

const titleError = addForm.querySelector('.title-error');
const linkError = addForm.querySelector('.link-error');

function toggleAddButton() {
  const isTitleValid = titleInput.validity.valid;
  const isLinkValid = linkInput.validity.valid;

  addSubmitButton.disabled = !(isTitleValid && isLinkValid);
}

titleInput.addEventListener('input', () => {
  checkInputValidity(titleInput, titleError);
  toggleAddButton();
});

linkInput.addEventListener('input', () => {
  checkInputValidity(linkInput, linkError);
  toggleAddButton();
});

addForm.addEventListener('reset', () => {
  addSubmitButton.disabled = true;
});