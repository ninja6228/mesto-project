import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._img = this._popup.querySelector('.popup__img');
    this._imgCaption = this._popup.querySelector('.popup__description');
  }

  open({ src, alt, caption }) {
    super.open();

    this._img.src = src;
    this._img.alt = alt;
    this._imgCaption.textContent = caption;
  }
}

export default PopupWithImage