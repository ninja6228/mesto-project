export {
  popups, buttonClose, popupImg, titleImg, pictureImg, popupUser, formUser, nameInput, jobInput, popupElement, formAddCard, inputCardTitle, inputCardLink, profile, nameProfile,
  jobProfile, profileButtonEdit, profileButtonCreate,validationParameters
};

//все попапы
const popups = document.querySelectorAll('.popup');

// все кнопки крестик для закрытие попапов
const buttonClose = document.querySelectorAll('.popup__toggle');

// попап картинки
const popupImg = document.querySelector('.popup_type_img');
const titleImg = popupImg.querySelector('.popup__description');
const pictureImg = popupImg.querySelector('.popup__img');

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
const jobProfile = profile.querySelector('.profile__activity');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonCreate = profile.querySelector('.profile__button-new');

// параметры валидации 
const validationParameters = {
  formSelector: '.form',
  inputSelector: '.popup__line',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__line_type_error',
  errorClass: 'popup__line-error_active',
  submitButtonInactive: 'popup__button_inactive'
};