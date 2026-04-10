export default class Card {
   constructor(data, templateSelector, handleImageClick, userId, handleLikeClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._ownerId = data.owner._id || data.owner;
    
    this._isLikedFromApi = data.isLiked;

    this._userId = userId;


    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;

    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
}

    _getTemplate() {
   return document 
   .querySelector(this._templateSelector)
   .content
   .querySelector(".gallery__item")
   .cloneNode(true); 

   }

    _isOwner() {
        return this._ownerId === this._userId;
    }

    _isLiked() {
    return this._isLikedFromApi;
    }

    _updateLikesView() {
        if(this._isLiked()) {
            this._likeButton.classList.add("gallery__like-button_active");
        } else {
            this._likeButton.classList.remove("gallery__like-button_active")
        }
    }

    updateLikes(isLiked) {
    this._isLikedFromApi = isLiked;
    this._updateLikesView();
    }

    removeCard() {
    this._element.remove();
    this._element = null;
    }

    _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
        this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
    });

    this._image.addEventListener("click", () => {
        this._handleImageClick( {
            name: this._name,
            link: this._link
        });
    });
    }

    generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".gallery__image");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._deleteButton = this._element.querySelector(".gallery__delete-button");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".gallery__title").textContent = this._name;

    if (!this._isOwner()) {
        this._deleteButton.remove();
    }

    this._setEventListeners();
    this._updateLikesView();

    return this._element;

    }
 }