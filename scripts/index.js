
// imports 
import Api from "./components/Api.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js"
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { FormValidator } from "./FormValidator.js";


// config
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1", 
  headers: {
    authorization: "448aba72-e72b-4e67-9da0-75036667b20c",
    "content-type": "application/json"
  }
});


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




// functions


function openImagePopup({name, link }) {
  imagePopup.open({ name, link});
}


function createCardElement(data) {
  const card = new Card(
   data,
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
    renderer: (item) => {
      const cardElement = createCardElement(item);
      cardList.addItem(cardElement);
    }
  },
  ".gallery__list"
);


const userInfo = new UserInfo({
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


// tester
api.getUserInfo()
  .then(data => console.log("USER:", data))
  .catch(err => console.log("ERROR USER:", err));

api.getInitialCards()
  .then(cards => {
    console.log(cards);
    cardList.renderItems(cards);
  })
  .catch(err => console.log(err));