// попап user
const popupUser = document.querySelector('.popup_type_user');
const formUser = popupUser.querySelector('.form-user');
const nameInput = popupUser.querySelector('.popup__line_name');
const jobInput = popupUser.querySelector('.popup__line_info');
const buttonCloseUser = popupUser.querySelector('.popup__toggle');
// попап element
const popupElement = document.querySelector('.popup_type_element');
const buttonCloseElement = popupElement.querySelector('.popup__toggle');
const formAddCard = popupElement.querySelector('.form-element');
const inputCardTitle = popupElement.querySelector('.popup__line_title');
const inputCardLink = popupElement.querySelector('.popup__line_link');
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
//template форма карточки 
const elementsTemplate = document.querySelector('#elements-template').content;
// место добавления новых карточек
const elementsSection = document.querySelector('.elements__wrapper');
//функция Октрытие модального
const openPopup = popup => {
  popup.classList.add('popup_opened')
}
//функция закртие модального окна
const closePopup = popup => {
  popup.classList.remove('popup_opened');
}
/*функция изменения имени и дейтельности через модальным окно с сохранением и закрытием окна */
function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  JobProfile.textContent = jobInput.value;
  closePopup(popupUser);
}
//функция формерования новой карточки с возможностью удаления и кнопкой лайк и открытием картинки
function createCard(titleValue, linkValue) {
  const elementsElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  elementsElement.querySelector('.elements__text').textContent = titleValue;
  elementsElement.querySelector('.elements__img').src = linkValue;
  elementsElement.querySelector('.elements__img').alt = `фотография ${titleValue}`;
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
    pictureImg.alt = `фотография ${titleValue}`;
    openPopup(popupImg);
  });
  return elementsElement;
}
// функция добавления карточки в DOM
function addCard(card) {
  elementsSection.prepend(card);
}
//функция добавления новой карточки на страницу через модальное окно 
function submitAddCardForm(evt) {
  evt.preventDefault();
  addCard(createCard(inputCardTitle.value, inputCardLink.value));
  closePopup(popupElement);
}
//формерование и добавление дефолтных карточек на страницу
initialCards.forEach(element => {
  addCard(createCard(element.name, element.link));
});
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
// Октрытие модального окна Element
profileButtonCreate.addEventListener('click', () => {
  formAddCard.reset();
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
// слушатель формы user
formUser.addEventListener('submit', submitEditProfileForm);
// слушатель формы Element
formAddCard.addEventListener('submit', submitAddCardForm);
