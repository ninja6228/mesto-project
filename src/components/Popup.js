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

  setEventListeners(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
      evt.stopPropagation();
    }
  }
}

export default Popup;