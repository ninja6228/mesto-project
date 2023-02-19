//функция изменения текст кнопки модального окна на момент обновление данных
export const renderButtonText = (button, text) => {
    button.textContent = text;
};

//текст для модальных окон на момент обновление данных и после обновление данных
export const textButtonSaveLoading = 'Сохранение...'; 
export const textButtonSaveNoLoading = 'Сохранить';
export const textButtonСreatLoading = 'Создание...';
export const textButtonСreatNoLoading = 'Создать';

class Popup {
  constructor(popupSelector) {
    this._popupContainer = document.querySelector(popupSelector);
    this._closePopupIcon = this._popupContainer.querySelector('.popup__toggle');
  }

  open() {
    this._popupContainer.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    const openedPopup = document.querySelector('.popup_opened');

    if (openedPopup) {
      openedPopup.classList.remove('popup_opened');
      document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
  }

  _handleEscClose(evt) {
    const key = evt.key;
    if (key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopupIcon.addEventListener("click", this.close)

    this._popupContainer.addEventListener("click", (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })
  }
}

class PopupWithImage extends Popup {
  constructor({ src, alt, caption }, popupSelector) {
    super(popupSelector);

    this._img = this._popupContainer.querySelector('.popup__img');
    this._imgCaption = this._popupContainer.querySelector('.popup__description');
    this._src = src;
    this._alt = alt;
    this._caption = caption;
  }

  open() {
    super.open();

    this._imgCaption.textContent = this._caption;
    this._img.src = this._src;
    this._img.alt = this._alt;
  }
}

export {Popup, PopupWithImage};