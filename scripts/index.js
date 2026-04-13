
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
const editForm = popup.querySelector(".popup__form");
const nameInput = editForm.querySelector('input[name="name"]');
const jobInput = editForm.querySelector('input[name="description"]');

// add card
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector(".popup__form");
const titleInput = addForm.querySelector('input[name="title"]');
const linkInput = addForm.querySelector('input[name="link"]');

// edit profile

const avatarElement = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");



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
  if (!card.isLiked()) {
    api.addLike(card.getId())
      .then((res) => {
        card.updateLikes(
          res.isLiked ? [{ _id: userId }] : []
        );
      })
      .catch((err) => console.log(err));
  } else {
    api.removeLike(card.getId())
      .then((res) => {
        card.updateLikes(
          res.isLiked ? [{ _id: userId }] : []
        );
      })
      .catch(err => console.log(err));
  }
}

function handleDeleteClick(card) {
  deletePopup.setSubmitAction(() => {

    deletePopup.renderLoading(true, "Eliminando...");

    api.deleteCard(card.getId()) 
    .then(() => {
      card.removeCard();
      deletePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
        deletePopup.renderLoading(false); 
      });
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
  jobSelector: ".profile__profession",
  avatarSelector: ".profile__image"
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

  addCardPopup.renderLoading(true, "Creando...");

  api.addCard({
    name: formData.title,
    link: formData.link
  })
  .then((newCard) => {
    const cardElement = createCardElement(newCard);
    cardList.addItem(cardElement);

    addCardPopup.close();
    addForm.reset();
  })
  .catch(err => console.log(err))
  .finally(() => {
    addCardPopup.renderLoading(false);
  });
});

addCardPopup.setEventListeners();


const deletePopup = new PopupWithConfirmation(".popup_type_confirm");
deletePopup.setEventListeners();

// user info



const avatarPopupInstance = new PopupWithForm(".popup_type_avatar", (formData) => {

  avatarPopupInstance.renderLoading(true, "Guardando...");

 api.updateAvatar({
  avatar: formData.avatar
 })
 .then((data) => {
  userInfo.setUserAvatar(data.avatar);
  avatarForm.reset();
  avatarPopupInstance.close();
 })
 .catch(err => console.log(err))
 .finally(() => {
  avatarPopupInstance.renderLoading(false);
 });
})

avatarPopupInstance.setEventListeners();


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

avatarElement.addEventListener("click", () => {
  avatarPopupInstance.open();
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

    userInfo.setUserAvatar(userData.avatar);

    cardList.renderItems(cards);
  })

  .catch(err => console.log(err));