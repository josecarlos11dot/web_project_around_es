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

function openImagePopup(title, link) {
  popupImage.src = link;
  popupImage.alt = title;
  popupCaption.textContent = title;

  imagePopup.classList.add("popup_opened");
}


const addButton = document.querySelector('.profile__add-button');

const addPopup = document.querySelector('.popup_type_add');

const addForm = addPopup.querySelector(".popup__form");
const titleInput = addForm.querySelector('input[name="title"]');
const linkInput = addForm.querySelector('input[name="link"]');

const galleryList = document.querySelector(".gallery__list");
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

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");



function createCard(title, link) {
  const card = document.createElement("li");
  card.classList.add("gallery__item");

const image = document.createElement("img");
image.classList.add("gallery__image");
image.src = link;
image.alt = title;

image.addEventListener("click", () => {
  openImagePopup(title, link);
});



const footer = document.createElement("div");
footer.classList.add("gallery__footer");


const cardTitle = document.createElement("h2");
cardTitle.classList.add("gallery__title");
cardTitle.textContent = title;


const likeButton = document.createElement("button");
likeButton.classList.add("gallery__like-button");

likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__like-button_active");
  });

const deleteButton = document.createElement("button");
  deleteButton.classList.add("gallery__delete-button");

  deleteButton.addEventListener("click", () => {
    card.remove();
  }); 

footer.append(cardTitle, likeButton);
card.append(image, footer,deleteButton);

return card;
 }

addButton.addEventListener('click', () => {
  addPopup.classList.add('popup_opened');
  
});


addPopup.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(addPopup);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const card = createCard(titleInput.value, linkInput.value);
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

imagePopup.addEventListener('mousedown', handleOverlayClick);

imagePopupClose.addEventListener("click", () => {
  closePopup(imagePopup);
});

document.addEventListener('keydown', handleEscClose);


initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  galleryList.append(card);
});
enableValidation();