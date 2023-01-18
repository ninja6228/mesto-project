import { initialCards } from "./constants.js";
import { openPopup } from "./modal.js";
import { popupImg, titleImg, pictureImg } from "./variables.js";

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
  const elementsImg = elementsElement.querySelector('.elements__img');
  elementsElement.querySelector('.elements__text').textContent = titleValue;
  elementsImg.src = linkValue;
  elementsImg.alt = `фотография ${titleValue}`;
  /* лайк - не лайк */
  elementsElement.querySelector('.elements__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__button_active');
  });
  /* удаление карточки */
  elementsElement.querySelector('.elements__delete').addEventListener('click', () => {
    elementsElement.remove();
  });
  /* открытие картинки в карточке */
  elementsImg.addEventListener('click', () => {
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
