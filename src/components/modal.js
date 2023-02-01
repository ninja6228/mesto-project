import {popups} from './variables.js';



//функция Октрытие попапа
export function openPopup(popupItem) {
  popupItem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupthroughEscape);
}

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

// функция проверки клавиши ecs
function closePopupthroughEscape(evt) {
  const key = evt.key;
  if (key === "Escape") {
    closePopup();
  }
}

// вешаем слушатель на все попапы через оверлей
popups.forEach(popupItem => {
  popupItem.addEventListener('click', closePopupthroughOverlay);
});

// текст кнопки на момент загрузки данных 
export const renderLoadingSave = (isLoading, button) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};

// текст кнопки на момент загрузки данных
export const renderLoadingСreating = (isLoading, button) => {
  if (isLoading) {
    button.textContent = 'Создание...';
  } else {
    button.textContent = 'Создать';
  }
};