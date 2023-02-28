class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupIcon = this._popup.querySelector('.popup__toggle');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    if (this._popup.classList.contains('popup_opened')) {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopupIcon.addEventListener("click", () => {
      this.close();
    })

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })
  }
}

export default Popup;