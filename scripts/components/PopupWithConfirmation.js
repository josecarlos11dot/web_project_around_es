import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._submitButton = this._popup.querySelector(".popup__button");
        this._defaultButtonText = this._submitButton.textContent;
    }
    setSubmitAction(action) {
       this._handleConfirm = action;  
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            if (this._handleConfirm) {
                this._handleConfirm ();
            }
        });
    }

    renderLoading(isLoading, text = "Guardando...") {
        if (isLoading) {
            this._submitButton.textContent = text;
        } else {
            this._submitButton.textContent = this._defaultButtonText;
        }
    }
}