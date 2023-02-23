export class FormValidator {
  constructor({ inputErrorClass, errorClass, submitButtonInactive, inputSelector, submitButtonSelector }, form) 
  {
    this._submitButtonSelector = submitButtonSelector
    this._inputSelector = inputSelector;
    this._submitButtonInactive = submitButtonInactive;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
  }

  // Приватный метод показа ошибки при валидации
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Приватный метод скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Приватный метод 1-проверяет патрен, 2-проверяет валидность поля
  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.textErrorPattern);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Приватный метод проверки валидности полей
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  // Приватный метод переключатель состояния кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._submitButtonInactive);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._submitButtonInactive);
    }
  }

  // Приватный метод вешает слушатель инпут всем полям, с активной проверкой ввода данных и переключением сосотояния кнопки 
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // Метод для провеки валидности полей, скрытием ошибки и переключением состояния кнопки до ввода данных в поле 
  validationStaticInput() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    inputList.forEach(inputElement => {
      this._isValid(inputElement);
      this._hideInputError(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  }

  // Метод включение валидации
  enableValidation() { this._setEventListeners(); }
}

