export {
  popupUser, formUser, nameInput, jobInput, popupElement, formAddCard, inputCardTitle, inputCardLink, profile, nameProfile,
  jobProfile, profileButtonEdit, profileButtonCreate, validationParameters, profileAvatar, avatarButtonEdit, popupAvatar, formAvatar, popupLineAvatar, buttonSaveUser,buttonSaveCard,
  buttonSaveAvatar
};

// попап user
const popupUser = document.querySelector('.popup_type_user');
const formUser = popupUser.querySelector('.form-user');
const nameInput = popupUser.querySelector('.popup__line_name');
const jobInput = popupUser.querySelector('.popup__line_info');
const buttonSaveUser = popupUser.querySelector('.popup__button');

// попап element
const popupElement = document.querySelector('.popup_type_element');
const formAddCard = popupElement.querySelector('.form-element');
const inputCardTitle = popupElement.querySelector('.popup__line_title');
const inputCardLink = popupElement.querySelector('.popup__line_link');
const buttonSaveCard = popupElement.querySelector('.popup__button');

// секция профиль 
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__activity');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonCreate = profile.querySelector('.profile__button-new');
const profileAvatar = profile.querySelector('.profile__avatar');
const avatarButtonEdit = profile.querySelector('.profile__avatar-button');

// попап аватарки
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('.form-avatar');
const popupLineAvatar = popupAvatar.querySelector('.popup__line_avatar');
const buttonSaveAvatar = popupAvatar.querySelector('.popup__button');

// параметры валидации 
const validationParameters = {
  inputSelector: '.popup__line',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__line_type_error',
  errorClass: 'popup__line-error_active',
  submitButtonInactive: 'popup__button_inactive'
};