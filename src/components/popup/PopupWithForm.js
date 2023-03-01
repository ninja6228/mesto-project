import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(submit, popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector('form');
    this._submitBtn = this._form.querySelector('.popup__button')
    this._submitBtnText = this._submitBtn.textContent;
    this._inputList = this._form.querySelectorAll('.popup__line');
    this._submit = submit;
  }

  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => this._submit(evt, this._getInputValues()))
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, loadingText = 'Создание...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}

export default PopupWithForm;