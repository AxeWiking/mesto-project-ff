function showInputError (formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.popup__${inputElement.name}_input-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError (formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.popup__${inputElement.name}_input-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

function inputEventListener (evt) {
  const popup = evt.target.closest('.popup__is-validating');
  const config = readConfig(popup);
  const formElement = popup.querySelector(config.formSelector);
  checkInputValidity(formElement, evt.currentTarget, config);
  toggleButtonState(formElement, config);
}

function storeConfig(popup, config) {
  popup.dataset.validationFormSelector = config.formSelector;
  popup.dataset.validationInputSelector = config.inputSelector;
  popup.dataset.validationSubmitButtonSelector = config.submitButtonSelector;
  popup.dataset.validationInactiveButtonClass = config.inactiveButtonClass;
  popup.dataset.validationInputErrorClass = config.inputErrorClass;
  popup.dataset.validationErrorClass = config.errorClass;
}

function readConfig(popup) {
  return { 
    formSelector: popup.dataset.validationFormSelector,
    inputSelector: popup.dataset.validationInputSelector,
    submitButtonSelector: popup.dataset.validationSubmitButtonSelector,
    inactiveButtonClass : popup.dataset.validationInactiveButtonClass,
    inputErrorClass: popup.dataset.validationInputErrorClass,
    errorClass: popup.dataset.validationErrorClass
  }
}

function removeConfig(popup) {
  delete popup.dataset.validationFormSelector;
  delete popup.dataset.validationInputSelector;
  delete popup.dataset.validationSubmitButtonSelector;
  delete popup.dataset.validationInactiveButtonClass;
  delete popup.dataset.validationInputErrorClass;
  delete popup.dataset.validationErrorClass;
}

export function startValidation(popup, config) {
  popup.classList.add('popup__is-validating');
  storeConfig(popup, config);

  const formElement = popup.querySelector(config.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  toggleButtonState(formElement, config);
  inputList.forEach((inputElement) => { 
    checkInputValidity(formElement, inputElement, config);
    inputElement.addEventListener('input', inputEventListener);
  });
}

export function removeValidation(popup) {
  const config = readConfig(popup);
  popup.classList.remove('popup__is-validating');

  const formElement = popup.querySelector(config.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(inputElement => 
    inputElement.removeEventListener('input', inputEventListener));
  removeConfig(popup);
  formElement.reset();
}

export function removeValidationHandler(evt) {
  if(evt.target.classList.contains('popup__is-validating')) {
    removeValidation(evt.target);
  }
}
