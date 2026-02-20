function showInputError(inputElement, errorElement) {
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(errorElement) {
  errorElement.textContent = "";
}

function checkInputValidity(inputElement, errorElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement);
  } else {
    hideInputError(errorElement);
  }
}

function toggleButtonState(inputs, button) {
  const isValid = Array.from(inputs).every(input => input.validity.valid);
  button.disabled = !isValid;
}

export function enableValidation() {
  const forms = document.querySelectorAll(".popup__form");

  forms.forEach(form => {
    const inputs = form.querySelectorAll(".popup__input");
    const button = form.querySelector(".popup__button");

    toggleButtonState(inputs, button);

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        const errorElement = form.querySelector(`.${input.name}-error`);
        checkInputValidity(input, errorElement);
        toggleButtonState(inputs, button);
      });
    });
  });
}