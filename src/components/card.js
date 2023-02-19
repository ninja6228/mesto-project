import {PopupWithImage} from "./Popup.js";
import {Api} from "./api";
import {apiConfig} from "./utils/apiConfig";

// место добавления новых карточек
const elementsSection = document.querySelector('.elements__wrapper');
// template форма карточки 
const elementsTemplate = document.querySelector('#elements-template').content;

const api = new Api(apiConfig);

// функция добавления карточки в DOM
export const addCard = (card) => {
  elementsSection.prepend(card);
};

// // функция добавления лайка на сервер
// const addlike = (button, counter, likes, cardId) => {
//   return addlikeApi(cardId)
//     .then((result) => {
//       if (!(button.classList.contains('elements__button_active'))) {
//         counter.textContent = likes.length + 1;
//       }
//       button.classList.add('elements__button_active');
//       counter.textContent = result.likes.length;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // функция удаления лайка на с сервер
// const deletelike = (button, counter, likes, cardId) => {
//   return deletelikeApi(cardId)
//     .then((result) => {
//       if (button.classList.contains('elements__button_active')) {
//         counter.textContent = likes.length - 1;
//       }
//       button.classList.remove('elements__button_active');
//       counter.textContent = result.likes.length;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

//функция формерования новой карточки 
export const createCard = (titleValue, linkValue, likes, idCreator, idCard, userId) => {
  const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  const elementsImg = elementsElement.querySelector('.elements__img');
  const elementsCounterLike = elementsElement.querySelector('.elements__counter-like');
  const buttonDelete = elementsElement.querySelector('.elements__delete');
  const buttonLike = elementsElement.querySelector('.elements__button');
  const cardLikes = Array.from(likes);
  elementsElement.querySelector('.elements__text').textContent = titleValue;
  elementsImg.src = linkValue;
  elementsImg.alt = `фотография ${titleValue}`;
  elementsCounterLike.textContent = likes.length;

  // проверка есть ли лайк
  cardLikes.forEach(function (element) {
    if (element._id === userId) {
      buttonLike.classList.add('elements__button_active');
    }
  });

  // отоброжение кнопки удалить
  if (idCreator !== userId) {
    buttonDelete.remove();
  }

  //лайк - не лайк
  buttonLike.addEventListener('click', function () {
    if (buttonLike.classList.contains('elements__button_active')) {
      api.deleteLikeApi(buttonLike, elementsCounterLike, likes, idCard);
    } else {
      api.addLikeApi(buttonLike, elementsCounterLike, likes, idCard);
    }
  });

  // удаление карточки 
  buttonDelete.addEventListener('click', () => {
    api.deleteCardApi(idCard)
      .then(() => elementsElement.remove())
      .catch((err) => console.log(err));
  });

  const popupImg = new PopupWithImage({
    src: linkValue,
    alt: `фотография ${titleValue}`,
    caption: titleValue
  }, '.popup_type_img')

  popupImg.setEventListeners();

  elementsImg.addEventListener('click', () => {
    popupImg.open();
  })

  return elementsElement;
}




