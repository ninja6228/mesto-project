import '../pages/index.css';
import {
  formUser, nameInput, jobInput, formAddCard, inputCardTitle, inputCardLink, nameProfile,
  jobProfile, profileButtonEdit, profileButtonCreate, validationParameters,
  profileAvatar, avatarButtonEdit, formAvatar, popupLineAvatar,
  buttonSaveUser, buttonSaveCard, buttonSaveAvatar
} from "./utils/constants.js";
import { addCard, createCard } from "./card.js";
import {
  PopupWithForm,
  renderButtonText,
  textButtonSaveLoading,
  textButtonSaveNoLoading,
  textButtonСreatLoading,
  textButtonСreatNoLoading
} from "./Popup.js";
import { enableValidation, validationStaticInput } from "./validate.js";
import { apiConfig } from './utils/apiConfig';
import { Api } from "./api";
import { Section } from './Section.js';

const api = new Api(apiConfig);

// функция изменения имени и дейтельности через попап
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  renderButtonText(buttonSaveUser, textButtonSaveLoading);
  api.setUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      profileSet(user);
      popupUser.close()
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
  api.setUserAvatar(popupLineAvatar.value)
    .then((user) => {
      profileSet(user);
      popupAvatar.close();
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
  api.setAddNewCard({
    name: inputCardTitle.value,
    link: inputCardLink.value
  })
    .then((item) => {
      addCard(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userId));
      popupNewCard.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderButtonText(buttonSaveCard, textButtonСreatNoLoading);
    });
};

const popupUser = new PopupWithForm((evt) => submitEditProfileForm(evt), '.popup_type_user');
popupUser.setEventListeners();

const popupNewCard = new PopupWithForm((evt) => submitAddCardForm(evt), '.popup_type_element');
popupNewCard.setEventListeners();

const popupAvatar = new PopupWithForm((evt) => submitAvatarForm(evt), '.popup_type_avatar');
popupAvatar.setEventListeners();

// Октрытие модального окна User с проверкой валидации
profileButtonEdit.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  validationStaticInput(formUser, validationParameters);
  popupUser.open();
});

// Октрытие модального окна Element с проверкой валидации
profileButtonCreate.addEventListener('click', () => {
  formAddCard.reset();
  validationStaticInput(formAddCard, validationParameters);
  popupNewCard.open();
});

// Открытие модального окна Avatar с проверкой валидации
avatarButtonEdit.addEventListener('click', () => {
  formAvatar.reset();
  validationStaticInput(formAvatar, validationParameters);
  popupAvatar.open()
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




// Временно!

const ServerCard = new Section({
  renderer: (item) => {
    ServerCard.addItem(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userId));
  }
}, '.elements__wrapper');


Promise.all([api.apiUser(), api.apiCards()])
  .then(([user, objcards]) => {
    profileSet(user);
    ServerCard.rendererItem(objcards.reverse());
   });

// включение валидации с параметрами
enableValidation(validationParameters);


