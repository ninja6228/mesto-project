import '../pages/index.css';
import {
  buttonClose, popupUser, formUser, nameInput, jobInput,
  popupElement, formAddCard, inputCardTitle, inputCardLink, nameProfile,
  jobProfile, profileButtonEdit, profileButtonCreate, validationParameters,
  avatarButtonEdit, popupAvatar, formAvatar, popupLineAvatar,
  buttonSaveUser, buttonSaveCard, buttonSaveAvatar
} from "./utils/constants.js";
import { addCard, createCard } from "./card.js";
import { openPopup, closePopup, renderButtonText, textButtonSaveLoading, textButtonSaveNoLoading, textButtonСreatLoading, textButtonСreatNoLoading } from "./modal.js";
import { apiConfig } from './utils/apiConfig';
// Импорт классов
import { FormValidator } from './FormValidator.js';
import { Api } from "./Api.js";
import { Section } from './Section.js';
import { UserInfo } from './UserInfo';

// переменная для храннения ID пользователя
let userId;

const conectApi = new Api(apiConfig);

const user = new UserInfo({
  name: '.profile__name',
  description: '.profile__activity',
  avatar: '.profile__avatar'
});


// функция изменения имени и дейтельности через попап
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  renderButtonText(buttonSaveUser, textButtonSaveLoading);
  setUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      user.setUserInfo(user);
      closePopup(popupUser);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderButtonText(buttonSaveUser, textButtonSaveNoLoading);
    });
};

// функция изменения аватарки через модальное окно
const submitAvatarForm = (evt) => {
  evt.preventDefault();
  renderButtonText(buttonSaveAvatar, textButtonСreatLoading);
  setUserAvatar(popupLineAvatar.value)
    .then((user) => {
      user.setUserAvatar(user);
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderButtonText(buttonSaveAvatar, textButtonСreatNoLoading);
    });
};

//функция добавления новой карточки на страницу через модальное окно 
const submitAddCardForm = (evt) => {
  evt.preventDefault();
  renderButtonText(buttonSaveCard, textButtonСreatLoading);
  setAddNewCard(inputCardTitle.value, inputCardLink.value)
    .then((item) => {
      addCard(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userId));
      closePopup(popupElement);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderButtonText(buttonSaveCard, textButtonСreatNoLoading);
    });
};

// Октрытие модального окна User с проверкой валидации
profileButtonEdit.addEventListener('click', () => {
  const actualUserInfo  = user.getUserInfo();
  nameInput.value = actualUserInfo.userName;
  jobInput.value = actualUserInfo.userDescription;
  validatorFormUser.validationStaticInput();
  openPopup(popupUser);
});

// Октрытие модального окна Element с проверкой валидации
profileButtonCreate.addEventListener('click', () => {
  formAddCard.reset();
  validatorFormAddCard.validationStaticInput();
  openPopup(popupElement);
});

// Открытие модального окна Avatar с проверкой валидации
avatarButtonEdit.addEventListener('click', () => {
  formAvatar.reset();
  validatorFormAvatar.validationStaticInput();
  openPopup(popupAvatar);
});

// слушатель формы user
formUser.addEventListener('submit', submitEditProfileForm);
//включение валидации для формы user
const validatorFormUser = new FormValidator(validationParameters, formUser);
validatorFormUser.enableValidation();

// слушатель формы Element
formAddCard.addEventListener('submit', submitAddCardForm);
//включение валидации для формы Element
const validatorFormAddCard = new FormValidator(validationParameters, formAddCard);
validatorFormAddCard.enableValidation();

// слушатель формы avatar
formAvatar.addEventListener('submit', submitAvatarForm);
//включение валидации для формы Avatar
const validatorFormAvatar = new FormValidator(validationParameters, formAvatar);
validatorFormAvatar.enableValidation();



// слушатель для всех кнопок закрытия попапов
buttonClose.forEach((element) => {
  element.addEventListener('click', () => closePopup());
});




// Временно!

const ServerCard = new Section({
  renderer: (item) => {
    ServerCard.addItem(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userId));
  }
}, '.elements__wrapper');


Promise.all([conectApi.apiUser(), conectApi.apiCards()])
  .then(([userInfo, cards]) => {
    userId = user._id;
    user.setUserInfo(userInfo);
    user.setUserAvatar(userInfo);
    ServerCard.rendererItem(cards.reverse());
  });



