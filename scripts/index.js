import { enableValidation } from "./validate.js";

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__close');


const profileTitle = document.querySelector('.profile__name');       
const profileDescription = document.querySelector('.profile__profession'); 
const editForm = popup.querySelector(".popup__form");
const nameInput = editForm.querySelector('input[name="name"]');
const jobInput = editForm.querySelector('input[name="description"]');





editButton.addEventListener('click', () => {
 nameInput.value = profileTitle.textContent;
 jobInput.value = profileDescription.textContent;
 
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







const botonesLike = document.querySelectorAll('.gallery__like-button');
botonesLike.forEach((boton) => {
  boton.addEventListener('click', () => {
    boton.classList.toggle('gallery__like-button_active');
  });
});

const addButton = document.querySelector('.profile__add-button');

const addPopup = document.querySelector('.popup_type_add');

const addForm = addPopup.querySelector(".popup__form");
const titleInput = addForm.querySelector('input[name="title"]');
const linkInput = addForm.querySelector('input[name="link"]');

const galleryList = document.querySelector(".gallery__list");

addButton.addEventListener('click', () => {
  addPopup.classList.add('popup_opened');
  
});


addPopup.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(addPopup);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const card = document.createElement("li");
  card.classList.add("gallery__item");

  card.innerHTML = `
    <img src="${linkInput.value}" alt="${titleInput.value}" class="gallery__image">
    <div class="gallery__footer">
      <h2 class="gallery__title">${titleInput.value}</h2>
      <button class="gallery__like-button"></button>
    </div>
  `;

  galleryList.prepend(card);

  closePopup(addPopup);
});


editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popup);
} )

popup.addEventListener('mousedown', handleOverlayClick);
addPopup.addEventListener('mousedown', handleOverlayClick);

document.addEventListener('keydown', handleEscClose);



enableValidation();