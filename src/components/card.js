import {Api} from "./Api";
import {apiConfig} from "./utils/apiConfig";

// место добавления новых карточек
const elementsSection = document.querySelector('.elements__wrapper');

const api = new Api(apiConfig);

// функция добавления карточки в DOM
export const addCard = (card) => {
  elementsSection.prepend(card);
};

class Card {
  constructor({ _id, name, link, likes, userID, creatorID }, templateSelector, handleCardClick) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userID = userID;
    this._creatorID = creatorID;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(card) {
    this._buttonLike = card.querySelector('.elements__button');
    this._buttonDelete = card.querySelector('.elements__delete');

    this._buttonLike.addEventListener('click', () => {
      this._processLike(card);
    })

    this._buttonDelete?.addEventListener('click', () => {
      this._deleteCard(card)
    })

    card.querySelector('.elements__img').addEventListener('click', this._handleCardClick)
  }

  _processLike(card) {
    this._buttonLike = card.querySelector('.elements__button');

    if (this._buttonLike.classList.contains('elements__button_active')) {
      api.deleteLikeApi(this._id).then(({ likes }) => {
        this._buttonLike.classList.remove('elements__button_active');
        card.querySelector('.elements__counter-like').textContent = likes.length;
      })
    } else {
      api.addLikeApi(this._id).then(({ likes }) => {
        this._buttonLike.classList.add('elements__button_active');
        card.querySelector('.elements__counter-like').textContent = likes.length;
      });
    }
  }

  _deleteCard(card) {
    api.deleteCardApi(this._id)
      .then(() => card.remove())
      .catch((err) => console.log(err));
  }

  _checkLike(card) {
    this._likes.forEach(element => {
      if (element._id === this._userID) {
        card.querySelector('.elements__button').classList.add('elements__button_active');
      }
    });
  }

  _checkDelete(card) {
    if (this._creatorID !== this._userID) {
      card.querySelector('.elements__delete').remove();
    }
  }

  generate() {
    const card = this._getElement();
    const img = card.querySelector('.elements__img');

    card.querySelector('.elements__text').textContent = this._name;
    img.src = this._link;
    img.alt = `фотография ${this._name}`;
    card.querySelector('.elements__counter-like').textContent = this._likes.length;


    this._checkDelete(card);
    this._checkLike(card);

    this._setEventListeners(card);

    return card;
  }
}

export default Card;



