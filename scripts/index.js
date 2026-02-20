import { enableValidation } from "./validate.js";

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__close');

editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', () => {
  closePopup(popup);
});



function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  const form = popupElement.querySelector('.popup__form');
  if (form) {
    form.reset();
  }
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



const profileTitle = document.querySelector('.profile__name');       
const profileDescription = document.querySelector('.profile__profession'); 



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
  
});


addPopup.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(addPopup);
});


popup.addEventListener('mousedown', handleOverlayClick);
addPopup.addEventListener('mousedown', handleOverlayClick);

document.addEventListener('keydown', handleEscClose);



enableValidation();