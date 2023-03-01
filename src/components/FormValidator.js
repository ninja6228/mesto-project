export default class FormValidator {
  constructor({ inputErrorClass, errorClass, submitButtonInactive, inputSelector, submitButtonSelector }, form) 
  {
    this._submitButtonSelector = submitButtonSelector
    this._inputSelector = inputSelector;
    this._submitButtonInactive = submitButtonInactive;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
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
  _checkInputValidity(inputElement) {
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
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  // Приватный метод переключатель состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._submitButtonInactive);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._submitButtonInactive);
    }
  }

  // Приватный метод вешает слушатель инпут всем полям, с активной проверкой ввода данных и переключением сосотояния кнопки 
  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Метод для провеки валидности полей, скрытием ошибки и переключением состояния кнопки до ввода данных в поле 
  resetValidation() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }

  // Метод включение валидации
  enableValidation() { this._setEventListeners(); }
}

