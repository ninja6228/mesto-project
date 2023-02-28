import './index.css';
import {
  avatarButtonEdit,
  buttonSaveAvatar,
  buttonSaveCard,
  buttonSaveUser,
  formAddCard,
  formAvatar,
  formUser,
  inputCardLink,
  inputCardTitle,
  jobInput,
  nameInput,
  popupLineAvatar,
  profileButtonCreate,
  profileButtonEdit,
  validationParameters,
} from "../utils/constants.js";
import PopupWithForm from "../components/popup/PopupWithForm";
import PopupWithImage from "../components/popup/PopupWithImage"
import { apiConfig } from '../utils/apiConfig';
// Импорт классов
import FormValidator from '../components/FormValidator.js';
import Api  from "../components/Api";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';
import Card from "../components/Card.js";

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
  popupUser.renderLoading(true, 'Сохранение...');
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
      popupUser.renderLoading(false, 'Сохранить');
    });
};

// функция изменения аватарки через модальное окно
const submitAvatarForm = (evt) => {
  evt.preventDefault();
  popupAvatar.renderLoading(true)
  api.setUserAvatar(popupLineAvatar.value)
    .then((items) => {
      user.setUserAvatar(items);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatar.renderLoading(false, 'Создать');
    });
};

//функция добавления новой карточки на страницу через модальное окно 
const submitAddCardForm = (evt) => {
  evt.preventDefault();
  popupNewCard.renderLoading(true)
  api.setAddNewCard({
    name: inputCardTitle.value,
    link: inputCardLink.value
  })
    .then(({ _id, name, link, likes, owner }) => {
      cardSection.addItem(handleCardCreation(_id, name, link, likes, userId, owner._id))
      popupNewCard.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupNewCard.renderLoading(false, 'Создать');
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
  popupUser.setInputValues(user.getUserInfo());
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

const cardSection = new Section({
  renderer: ({ _id, name, link, likes, owner }) => {
    cardSection.addItem(handleCardCreation(_id, name, link, likes, userId, owner._id));
  }
}, '.elements__wrapper');

function handleCardClick(link, name) {
  const popupImg = new PopupWithImage('.popup_type_img')

  popupImg.setEventListeners();
  popupImg.open({
    src: link,
    alt: `Фотография ${name}`,
    caption: name
  });
}
function handleCardCreation(_id, name, link, likes, userID, creatorID) {
  const data = {
    _id,
    name,
    link,
    likes,
    userID,
    creatorID,
  };

  const deleteCard = () => api.deleteCardApi(_id);
  const likeCard = () => api.addLikeApi(_id);
  const dislikeCard = () => api.deleteLikeApi(_id);

  return new Card(data, '#elements-template', () => handleCardClick(link, name), deleteCard, likeCard, dislikeCard).generate();
}

Promise.all([api.apiUser(), api.apiCards()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    user.setUserInfo(userInfo);
    user.setUserAvatar(userInfo);
    cardSection.rendererItem(cards.reverse());
  })
  .catch((err) => console.log(err));


