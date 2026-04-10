import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
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
}