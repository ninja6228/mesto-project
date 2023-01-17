import { initialCards } from "./constants.js";
import { openPopup} from "./modal.js";

// попап картинки
const popupImg = document.querySelector('.popup_type_img');
const titleImg = popupImg.querySelector('.popup__description');
const pictureImg = popupImg.querySelector('.popup__img');

// место добавления новых карточек
const elementsSection = document.querySelector('.elements__wrapper');
// template форма карточки 
const elementsTemplate = document.querySelector('#elements-template').content;

// функция добавления карточки в DOM
export function addCard(card) {
  elementsSection.prepend(card);
}

//функция формерования новой карточки с возможностью удаления и кнопкой лайк и открытием картинки
export function createCard(titleValue, linkValue) {
  const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  elementsElement.querySelector('.elements__text').textContent = titleValue;
  elementsElement.querySelector('.elements__img').src = linkValue;
  elementsElement.querySelector('.elements__img').alt = `фотография ${titleValue}`;
  /* лайк - не лайк */
  elementsElement.querySelector('.elements__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__button_active');
  });
  /* удаление карточки */
  elementsElement.querySelector('.elements__delete').addEventListener('click', () => {
    elementsElement.remove();
  });

  /* открытие картинки в карточке */
  elementsElement.querySelector('.elements__img').addEventListener('click', () => {
    titleImg.textContent = titleValue;
    pictureImg.src = linkValue;
    pictureImg.alt = `фотография ${titleValue}`;
    openPopup(popupImg);
  });
  return elementsElement;
}

// формерование и добавление дефолтных карточек на страницу
initialCards.forEach(element => {
  addCard(createCard(element.name, element.link));
});
