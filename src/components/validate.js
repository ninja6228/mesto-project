// добавляет класс с ошибкой
const showInputError = (formElement, inputElement, parameter) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameter.inputErrorClass);
  errorElement.classList.add(parameter.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

// удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, parameter) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameter.inputErrorClass);
  errorElement.classList.remove(parameter.errorClass);
  errorElement.textContent = '';
};

// 1-проверяет патрен у поля, 2-проверяет валидность поля 
const isValid = (formElement, inputElement, parameter) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.textErrorPattern);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, parameter);
  } else {
    hideInputError(formElement, inputElement, parameter);
  }
};

// вешает слушатель всем полям
const setEventListeners = (formElement, parameter) => {
  const inputList = Array.from(formElement.querySelectorAll(parameter.inputSelector));
  const buttonElement = formElement.querySelector(parameter.submitButtonSelector);
  
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, parameter);
      toggleButtonState(inputList, buttonElement, parameter);
    });
    isValid(formElement, inputElement, parameter);
    toggleButtonState(inputList, buttonElement, parameter);
  });
};

// валидность полей 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// переключатель состояния кнопки
const toggleButtonState = (inputList, buttonElement, parameter) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(parameter.submitButtonInactive);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(parameter.submitButtonInactive);
  }
};

// функция включения валидации
export const enableValidation = (parameter) => {
  const formList = Array.from(document.querySelectorAll(parameter.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, parameter);
  });
};
