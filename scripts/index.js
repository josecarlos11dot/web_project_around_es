// imports 
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
// config
const validationConfig = {
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__button",
};


// selectors
// profile
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__name');       
const profileDescription = document.querySelector('.profile__profession'); 
const editForm = popup.querySelector(".popup__form");
const nameInput = editForm.querySelector('input[name="name"]');
const jobInput = editForm.querySelector('input[name="description"]');

// add card
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector(".popup__form");
const titleInput = addForm.querySelector('input[name="title"]');
const linkInput = addForm.querySelector('input[name="link"]');

// gallery
const galleryList = document.querySelector(".gallery__list");

// image popup
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");

// initialcards
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

// functions
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

// instances
const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

//event listeners
// open popups


editButton.addEventListener('click', () => {
 nameInput.value = profileTitle.textContent;
 jobInput.value = profileDescription.textContent;
 
 popup.classList.add('popup_opened');
});

addButton.addEventListener('click', () => {
  addPopup.classList.add('popup_opened');
  
});
// close popups
closeButton.addEventListener('click', () => {
  closePopup(popup);
});

addPopup.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(addPopup);
});

imagePopupClose.addEventListener("click", () => {
  closePopup(imagePopup);
});

// submit forms
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popup);
} )

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardElement = createCardElement({
    name: titleInput.value,
    link: linkInput.value
  });

  galleryList.prepend(cardElement);

  closePopup(addPopup);
});

// global events
popup.addEventListener('mousedown', handleOverlayClick);
addPopup.addEventListener('mousedown', handleOverlayClick);
imagePopup.addEventListener('mousedown', handleOverlayClick);

document.addEventListener('keydown', handleEscClose);


// initial render
initialCards.forEach((item) => {
  const cardElement = createCardElement(item);
  galleryList.append(cardElement);
});

