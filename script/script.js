// попап user
const popupUser = document.querySelector('.popup_type_user');
const formUser = popupUser.querySelector('.form-user');
const nameInput = popupUser.querySelector('.popup__line_name');
const jobInput = popupUser.querySelector('.popup__line_info');
const buttonCloseUser = popupUser.querySelector('.popup__toggle');
// попап element
const popupElement = document.querySelector('.popup_type_element');
const buttonCloseElement = popupElement.querySelector('.popup__toggle');
const formElement = popupElement.querySelector('.form-element');
// секция профиль
const profile = document.querySelector('.profile')
const nameProfile = profile.querySelector('.profile__name');
const JobProfile = profile.querySelector('.profile__activity');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonCreate = profile.querySelector('.profile__button-new');
// попап картинки
const popupImg = document.querySelector('.popup_type_img')
const buttonCloseImg = popupImg.querySelector('.popup__toggle');
const titleImg = popupImg.querySelector('.popup__description')
const pictureImg = popupImg.querySelector('.popup__img')
//функция Октрытие модального
const openPopup = popupElemen => {
  popupElemen.classList.add('popup_opened')
}
//функция закртие модального окна
const closePopup = popupElemen => {
  popupElemen.classList.remove('popup_opened');
}
// Октрытие модального окна User
profileButtonEdit.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = JobProfile.textContent;
  openPopup(popupUser);
});
// закртие модального окна User
buttonCloseUser.addEventListener('click', () => {
  closePopup(popupUser);
});
/* Изменения имени и дейтельности через модальным окно с сохранением и закрытием окна */
function formSubmitUser(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  JobProfile.textContent = jobInput.value;
  closePopup(popupUser);
}
formUser.addEventListener('submit', formSubmitUser);
// Октрытие модального окна Element
profileButtonCreate.addEventListener('click', () => {
  openPopup(popupElement);
});
// закртие модального окна Element
buttonCloseElement.addEventListener('click', () => {
  closePopup(popupElement);
});
//закрытие модального окна img
buttonCloseImg.addEventListener('click', () => {
  closePopup(popupImg);
});
//функция формерования новой карточки с возможностью удаления и кнопкой лайк и открытием картинки
function creatingNewCard(titleValue, linkValue) {
  const elementsSection = document.querySelector('.elements__wrapper');
  const elementsTemplate = document.querySelector('#elements-template').content; /* заменить на класс */
  const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  elementsElement.querySelector('.elements__text').textContent = titleValue;
  elementsElement.querySelector('.elements__img').src = linkValue;
  /* лайк - не лайк */
  elementsElement.querySelector('.elements__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__button_active');
  });
  /* удаление карточки */
  elementsElement.querySelector('.elements__delete').addEventListener('click', () => {
    elementsElement.remove();
  });
  /* открытие картинки в карточке */
  elementsElement.querySelector('.elements__img').addEventListener('click', () => {
    titleImg.textContent = titleValue;
    pictureImg.src = linkValue;
    openPopup(popupImg);
  }); 
  elementsSection.prepend(elementsElement);
}
// добавления новой карточки на страницу через модальное окно 
function formSubmitElement(evt) {
  evt.preventDefault();
  const title = document.querySelector('.popup__line_title');
  const link = document.querySelector('.popup__line_link');
  creatingNewCard(title.value, link.value);
  link.value = '';
  title.value = '';
  closePopup(popupElement);
}
formElement.addEventListener('submit', formSubmitElement);
// массив с дефолтными карточками
const initialCards = [
  {
    name: 'Ростов',
    link: 'https://images.unsplash.com/photo-1661956600655-e772b2b97db4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1504615458222-979e04d69a27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
  },
  {
    name: 'Смоленск',
    link: 'https://images.unsplash.com/photo-1668101205453-97cd2ba2bb26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Вологда',
    link: 'https://images.unsplash.com/photo-1668123508592-d004d362dde3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  },
  {
    name: 'Санкт-петербург',
    link: 'https://images.unsplash.com/photo-1555460285-763ba96917d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9zY293fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }
];
// формерование и добавление дефолтных карточек на страницу
initialCards.forEach(element => {
  creatingNewCard(element.name, element.link)
});
