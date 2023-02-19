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
import { enableValidation, validationStaticInput } from "./validate.js";
import { apiConfig } from './utils/apiConfig';
// Импорт классов
import { Api } from "./Api.js";
import { Section } from './Section.js';
import { UserInfo } from './UserInfo';

// переменная для храннения ID пользователя
let userId;

const conectApi = new Api(apiConfig);

const userInfo = new UserInfo({
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
      userInfo.setUserInfo(user);
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
      userInfo.setUserAvatar(user);
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
  const actualUserInfo  = userInfo.getUserInfo();
  nameInput.value = actualUserInfo.userName;
  jobInput.value = actualUserInfo.userDescription;
  validationStaticInput(formUser, validationParameters);
  openPopup(popupUser);
});

// Октрытие модального окна Element с проверкой валидации
profileButtonCreate.addEventListener('click', () => {
  formAddCard.reset();
  validationStaticInput(formAddCard, validationParameters);
  openPopup(popupElement);
});

// Открытие модального окна Avatar с проверкой валидации
avatarButtonEdit.addEventListener('click', () => {
  formAvatar.reset();
  validationStaticInput(formAvatar, validationParameters);
  openPopup(popupAvatar);
});

// слушатель формы user
formUser.addEventListener('submit', submitEditProfileForm);

// слушатель формы Element
formAddCard.addEventListener('submit', submitAddCardForm);

// слушатель формы avatar
formAvatar.addEventListener('submit', submitAvatarForm);

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
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    ServerCard.rendererItem(cards.reverse());
  });



// включение валидации с параметрами
enableValidation(validationParameters);


