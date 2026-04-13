import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input")
        this._submitButton = this._popup.querySelector(".popup__button");
        this._defaultButtonText = this._submitButton.textContent;
    
    }

    _getInputValues() {
        const formValues = {};

        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });

        return formValues;
    }

     _handleSubmit(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        
    }

    setEventListeners() {
        super.setEventListeners();

        
        this._form.addEventListener(
            "submit",
            this._handleSubmit.bind(this)
        );
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading , text = "Guardando...") {
        if (isLoading) {
            this._submitButton.textContent = text;
        } else {
            this._submitButton.textContent = this._defaultButtonText;
        }
    }
}

