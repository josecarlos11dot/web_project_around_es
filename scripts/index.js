
// imports 
import Api from "./components/Api.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js"
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";


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
    openImagePopup,
    userId,
    handleLikeClick,
    handleDeleteClick
  );

  return card.generateCard();
}

function handleLikeClick(card) {
  if (!card._isLiked()) {
    api.addLike(card._id)
    .then((res) => {
      card.updateLikes(res.isLiked);
    })
    .catch((err) => console.log(err));
  } else{
    api.removeLike(card._id)
    .then((res) => {
      card.updateLikes(res.isLiked);
    })
    .catch(err => console.log(err));
  }
}

function handleDeleteClick(card) {
  deletePopup.setSubmitAction(() => {
    api.deleteCard(card._id) 
    .then(() => {
      card.removeCard();
      deletePopup.close();
    })
    .catch(err => console.log(err));
  });
  deletePopup.open();
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

  editPopup.renderLoading(true);

  api.updateUserInfo({
    name: formData.name,
    about: formData.description
  })
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about
    });
    editPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editPopup.renderLoading(false);
  });
});

editPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup_type_add", (formData) => {
  api.addCard({
    name: formData.title,
    link: formData.link
  })
  .then((newCard) => {
    console.log("NEW CARD:", newCard);

    const cardElement = createCardElement(newCard);
    cardList.addItem(cardElement);
  })
  .catch(err => console.log(err));
})

addCardPopup.setEventListeners();


const deletePopup = new PopupWithConfirmation(".popup_type_confirm");
deletePopup.setEventListeners();




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

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });

    cardList.renderItems(cards);
  })

  .catch(err => console.log(err));