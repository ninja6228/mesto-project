import '../pages/index.css';
import {
  popups, buttonClose, popupUser, formUser, nameInput, jobInput,
  popupElement, formAddCard, inputCardTitle, inputCardLink, nameProfile,
  jobProfile, profileButtonEdit, profileButtonCreate, validationParameters
} from "./variables.js";
import { addCard, createCard } from "./card.js";
import { openPopup, closePopup, closePopupthroughOverlay } from "./modal.js";
import { enableValidation, validationStaticInput } from "./validate.js";


// функция изменения имени и дейтельности через модальным окно с сохранением и закрытием окна
function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupUser);
}

//функция добавления новой карточки на страницу через модальное окно 
function submitAddCardForm(evt) {
  evt.preventDefault();
  addCard(createCard(inputCardTitle.value, inputCardLink.value));
  closePopup(popupElement);
}

// Октрытие модального окна User с проверкой валидации
profileButtonEdit.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  validationStaticInput(formUser, validationParameters);
  openPopup(popupUser);
});

// Октрытие модального окна Element с проверкой валидации
profileButtonCreate.addEventListener('click', () => {
  formAddCard.reset();
  validationStaticInput(formAddCard, validationParameters);
  openPopup(popupElement);
});

// слушатель формы user
formUser.addEventListener('submit', submitEditProfileForm);

// слушатель формы Element
formAddCard.addEventListener('submit', submitAddCardForm);

// вешаем слушатель на все попапы через оверлей
popups.forEach(popupItem => {
  popupItem.addEventListener('click', closePopupthroughOverlay);
});

// слушатель для всех кнопок закрытия попапов
buttonClose.forEach((element) => {
  element.addEventListener('click', () => closePopup());
});

// включение валидации с параметрами
enableValidation(validationParameters);