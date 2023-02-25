import './index.css';
import {
  formUser,
  nameInput,
  jobInput,
  formAddCard,
  inputCardTitle,
  inputCardLink,
  profileButtonEdit,
  profileButtonCreate,
  validationParameters,
  avatarButtonEdit,
  formAvatar,
  popupLineAvatar,
  buttonSaveUser,
  buttonSaveCard,
  buttonSaveAvatar
} from "../components/utils/constants.js";
import Card, { addCard } from "../components/Card.js";
import {
  PopupWithForm,
  PopupWithImage,
  renderButtonText,
  textButtonSaveLoading,
  textButtonSaveNoLoading,
  textButtonСreatLoading,
  textButtonСreatNoLoading
} from "../components/Popup.js";
import { apiConfig } from '../components/utils/apiConfig';
// Импорт классов
import  FormValidator  from '../components/FormValidator.js';
import { Api } from "../components/Api";
import  Section  from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';

// переменная для храннения ID пользователя
let userId;

const api = new Api(apiConfig);

const user = new UserInfo({
  name: '.profile__name',
  description: '.profile__activity',
  avatar: '.profile__avatar'
});


// функция изменения имени и дейтельности через попап
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  renderButtonText(buttonSaveUser, textButtonSaveLoading);
  api.setUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((items) => {
      user.setUserInfo(items);
      popupUser.close();
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
    .then((items) => {
      user.setUserAvatar(items);
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
    .then(({ _id, name, link, likes, owner }) => {
      const data = {
        _id,
        name,
        link,
        likes,
        userID: userId,
        creatorID: owner._id,
      };
      const card = new Card(data, '#elements-template', () => handleCardClick(link, name)).generate();

      addCard(card);
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
  const { userName, userDescription } = user.getUserInfo();
  nameInput.value = userName;
  jobInput.value = userDescription;
  validatorFormUser.resetValidation();
  popupUser.open();
});

// Октрытие модального окна Element с проверкой валидации
profileButtonCreate.addEventListener('click', () => {
  validatorFormAddCard.resetValidation();
  popupNewCard.open();
});

// Открытие модального окна Avatar с проверкой валидации
avatarButtonEdit.addEventListener('click', () => {
  validatorFormAvatar.resetValidation();
  popupAvatar.open()
});

//включение валидации для формы user
const validatorFormUser = new FormValidator(validationParameters, formUser);
validatorFormUser.enableValidation();

//включение валидации для формы Element
const validatorFormAddCard = new FormValidator(validationParameters, formAddCard);
validatorFormAddCard.enableValidation();

//включение валидации для формы Avatar
const validatorFormAvatar = new FormValidator(validationParameters, formAvatar);
validatorFormAvatar.enableValidation();

const ServerCard = new Section({
  renderer: ({ _id, name, link, likes, owner }) => {
    const data = {
      _id,
      name,
      link,
      likes,
      userID: userId,
      creatorID: owner._id,
    };
    const card = new Card(data, '#elements-template', () => handleCardClick(link, name)).generate();

    ServerCard.addItem(card);
  }
}, '.elements__wrapper');

function handleCardClick(link, name) {
  const popupImg = new PopupWithImage({
    src: link,
    alt: `фотография ${name}`,
    caption: name
  }, '.popup_type_img')

  popupImg.setEventListeners();
  popupImg.open();
}

Promise.all([api.apiUser(), api.apiCards()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    user.setUserInfo(userInfo);
    user.setUserAvatar(userInfo);
    ServerCard.rendererItem(cards.reverse());
  });


