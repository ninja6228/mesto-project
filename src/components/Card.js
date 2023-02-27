export default class Card {
  constructor({ _id, name, link, likes, userID, creatorID }, templateSelector, handleCardClick, deleteCardRequest, likeCard, dislikeCard) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userID = userID;
    this._creatorID = creatorID;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardRequest = deleteCardRequest;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._processLike();
    });

    this._buttonDelete?.addEventListener('click', () => {
      this._deleteCard();
    });

    this._img.addEventListener('click', this._handleCardClick);
  }

  _processLike() {
    if (this._buttonLike.classList.contains('elements__button_active')) {
      this._dislikeCard()
        .then(({ likes }) => {
          this._buttonLike.classList.remove('elements__button_active');
          this._likesCounter.textContent = likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._likeCard()
        .then(({ likes }) => {
          this._buttonLike.classList.add('elements__button_active');
          this._likesCounter.textContent = likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  _deleteCard() {
    this._deleteCardRequest()
      .then(() => this._card.remove())
      .catch((err) => console.log(err));
  }

  _checkLike() {
    this._likes.forEach(element => {
      if (element._id === this._userID) {
        this._buttonLike.classList.add('elements__button_active');
      }
    });
  }

  _checkDelete() {
    if (this._creatorID !== this._userID) {
      this._buttonDelete.remove();
    }
  }

  generate() {
    this._card = this._getElement();

    this._buttonLike = this._card.querySelector('.elements__button');
    this._buttonDelete = this._card.querySelector('.elements__delete');
    this._likesCounter = this._card.querySelector('.elements__counter-like');
    this._likesCounter.textContent = this._likes.length;
    this._img = this._card.querySelector('.elements__img');
    this._img.src = this._link;
    this._img.alt = `Фотография ${this._name}`;
    this._cardTitle = this._card.querySelector('.elements__text');
    this._cardTitle.textContent = this._name;

    this._checkDelete();
    this._checkLike();
    this._setEventListeners();

    return this._card;
  }
}




