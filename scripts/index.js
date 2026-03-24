
// imports 
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import Card from "./components/Card.js"
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

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCardElement(item);
      cardList.addItem(cardElement);
    }
  },
  ".gallery__list"
);


const editPopup = new Popup(".popup_type_edit");
editPopup.setEventListeners();

const addCardPopup = new Popup(".popup_type_edit");
editPopup.setEventListeners();
//event listeners



editButton.addEventListener('click', () => {
 nameInput.value = profileTitle.textContent;
 jobInput.value = profileDescription.textContent;
editFormValidator.resetValidation();
editPopup.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
  
});



// submit forms
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  editPopup.close();
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
 
  const cardElement = createCardElement({
    name: titleInput.value,
    link: linkInput.value
  });

  cardList.addItem(cardElement);

   addCardPopup.close();
});


// initial render
cardList.renderItems();

