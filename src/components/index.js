import '../pages/index.css';
import {
  buttonClose, popupUser, formUser, nameInput, jobInput,
  popupElement, formAddCard, inputCardTitle, inputCardLink, nameProfile,
  jobProfile, profileButtonEdit, profileButtonCreate, validationParameters,
  profileAvatar, avatarButtonEdit, popupAvatar, formAvatar, popupLineAvatar,
  buttonSaveUser, buttonSaveCard, buttonSaveAvatar
} from "./utils/variables.js";
import { addCard, createCard } from "./card.js";
import { openPopup, closePopup, renderButtonText, textButtonSaveLoading, textButtonSaveNoLoading, textButtonСreatLoading, textButtonСreatNoLoading } from "./modal.js";
import { enableValidation, validationStaticInput } from "./validate.js";
import { setUserInfo, setAddNewCard, getAppInfo, setUserAvatar } from "./api.js";



// функция изменения имени и дейтельности через попап
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  renderButtonText(buttonSaveUser, textButtonSaveLoading);
  setUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      profileSet(user);
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
      profileSet(user);
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
let userId;

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
        addCard(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userId));
      });
    })
    .catch((err) => console.log(err));
};
pageRendering();

// включение валидации с параметрами
enableValidation(validationParameters);


