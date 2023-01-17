import '../pages/index.css';
import { addCard, createCard } from "./card.js";
import { openPopup, closePopup, closePopupthroughOverlay } from "./modal.js";
import { enableValidation } from "./validate.js";

//все попапы
const popups = document.querySelectorAll('.popup');
// все кнопки крестик для закрытие попапов
const buttonClose = document.querySelectorAll('.popup__toggle');
// попап user
const popupUser = document.querySelector('.popup_type_user');
const formUser = popupUser.querySelector('.form-user');
const nameInput = popupUser.querySelector('.popup__line_name');
const jobInput = popupUser.querySelector('.popup__line_info');
// попап element
const popupElement = document.querySelector('.popup_type_element');
const formAddCard = popupElement.querySelector('.form-element');
const inputCardTitle = popupElement.querySelector('.popup__line_title');
const inputCardLink = popupElement.querySelector('.popup__line_link');
// секция профиль 
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const JobProfile = profile.querySelector('.profile__activity');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonCreate = profile.querySelector('.profile__button-new');
// настройки валидации 
const validationParameters = { 
  formSelector: '.form',
  inputSelector: '.popup__line',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__line_type_error',
  errorClass: 'popup__line-error_active',
  submitButtonInactive: 'popup__button_inactive'
};

// функция изменения имени и дейтельности через модальным окно с сохранением и закрытием окна
function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  JobProfile.textContent = jobInput.value;
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
  jobInput.value = JobProfile.textContent;
  enableValidation(validationParameters);
  openPopup(popupUser);
});

// Октрытие модального окна Element с проверкой валидации
profileButtonCreate.addEventListener('click', () => {
  formAddCard.reset();
  enableValidation(validationParameters);
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
