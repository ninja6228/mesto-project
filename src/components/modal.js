// функция проверки клавиши ecs
function closePopupthroughEscape(evt) {
  const key = evt.key;
  if (key === "Escape") {
    closePopup();
  }
}

//функция Октрытие попапа
export function openPopup(popupItem) {
  popupItem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupthroughEscape);
};

// функиция закрытия попапа
export function closePopup() {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup) {
    openedPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupthroughEscape);

  }
}

// функция закрытия попапа через оверлей
export function closePopupthroughOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
    evt.stopPropagation();
  }
}