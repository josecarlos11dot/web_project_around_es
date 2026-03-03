import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validationConfig = {
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__button",
};



const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__name');       
const profileDescription = document.querySelector('.profile__profession'); 
const editForm = popup.querySelector(".popup__form");
const nameInput = editForm.querySelector('input[name="name"]');
const jobInput = editForm.querySelector('input[name="description"]');


const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector(".popup__form");
const titleInput = addForm.querySelector('input[name="title"]');
const linkInput = addForm.querySelector('input[name="link"]');


const galleryList = document.querySelector(".gallery__list");


const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");


const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "./images/louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "./images/montanas.jpg"
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg"
  },
  {
    name: "Vanois National Park",
    link: "./images/vanois.jpg"
  },
  {
    name: "Lago di Braies",
    link: "./images/braies.jpg"
  }
];


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

function openImagePopup(title, link) {
  popupImage.src = link;
  popupImage.alt = title;
  popupCaption.textContent = title;

  imagePopup.classList.add("popup_opened");
}


function createCardElement(data) {
  const card = new Card(
    data.name, 
    data.link, 
    "#card-template",
    openImagePopup
  );
  return card.generateCard();
}


addButton.addEventListener('click', () => {
  addPopup.classList.add('popup_opened');
  
});


addPopup.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(addPopup);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardElement = createCardElement({
    name: titleInput.value,
    link: linkInput.value
  });

  galleryList.prepend(cardElement);

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

imagePopup.addEventListener('mousedown', handleOverlayClick);

imagePopupClose.addEventListener("click", () => {
  closePopup(imagePopup);
});

document.addEventListener('keydown', handleEscClose);


initialCards.forEach((item) => {
  const cardElement = createCardElement(item);
  galleryList.append(cardElement);
});

