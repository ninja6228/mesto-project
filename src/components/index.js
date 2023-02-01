import '../pages/index.css';
import {
  buttonClose, popupUser, formUser, nameInput, jobInput,
  popupElement, formAddCard, inputCardTitle, inputCardLink, nameProfile,
  jobProfile, profileButtonEdit, profileButtonCreate, validationParameters,
  profileAvatar, avatarButtonEdit, popupAvatar, formAvatar, popupLineAvatar,
  buttonSaveUser, buttonSaveCard, buttonSaveAvatar
} from "./variables.js";
import { addCard, createCard } from "./card.js";
import { openPopup, closePopup, renderLoadingSave, renderLoadingСreating } from "./modal.js";
import { enableValidation, validationStaticInput } from "./validate.js";
import { setUserInfo, setAddNewCard, getAppInfo, setUserAvatar } from "./api.js";


// функция изменения имени и дейтельности через попап
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  renderLoadingSave(true, buttonSaveUser);
  setUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      profileSet(user);
      closePopup(popupUser);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoadingSave(false, buttonSaveUser);
    });
};

// функция изменения аватарки через модальное окно
const submitAvatarForm = (evt) => {
  evt.preventDefault();
  renderLoadingСreating(true, buttonSaveAvatar);
  setUserAvatar(popupLineAvatar.value)
    .then((user) => {
      profileSet(user);
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoadingСreating(false, buttonSaveAvatar);
    });
};

//функция добавления новой карточки на страницу через модальное окно 
const submitAddCardForm = (evt) => {
  evt.preventDefault();
  renderLoadingСreating(true, buttonSaveCard);
  setAddNewCard(inputCardTitle.value, inputCardLink.value)
    .then((item) => {
      addCard(createCard(item.name, item.link, item.likes, item.owner._id, item._id));
      closePopup(popupElement);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoadingСreating(false, buttonSaveCard);
    });
};

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

// переменная для храннения ID пользователя
export let userId;

// функция данных профеля 
const profileSet = (user) => {
  nameProfile.textContent = user.name,
    jobProfile.textContent = user.about,
    profileAvatar.src = user.avatar,
    userId = user._id
};

//одновременная загрузка всех данных на страницу 
const pageRendering = () => {
  getAppInfo()
    .then(([user, cards]) => {
      profileSet(user);
      cards.reverse().forEach(item => {
        addCard(createCard(item.name, item.link, item.likes, item.owner._id, item._id));
      });
    })
    .catch((err) => console.log(err));
};
pageRendering();

// включение валидации с параметрами
enableValidation(validationParameters);


