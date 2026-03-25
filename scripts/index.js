
// imports 
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import Card from "./components/Card.js"
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Userinfo from "./components/UserInfo.js";
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



// image popup

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();



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


function openImagePopup(name, link) {
  imagePopup.open({ name, link});
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


const userInfo = new Userinfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__profession"
});


const editPopup = new PopupWithForm(".popup_type_edit", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description
  });
});

editPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup_type_add", (formData) => {
  const cardElement = createCardElement({
    name: formData.title,
    link: formData.link
  });
  cardList.addItem(cardElement);
});

addCardPopup.setEventListeners();





//event listeners



editButton.addEventListener('click', () => {
 const userData = userInfo.getUserInfo();

 nameInput.value =userData.name;
 jobInput.value = userData.job;

 editFormValidator.resetValidation();
 editPopup.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
  
});






// initial render
cardList.renderItems();

