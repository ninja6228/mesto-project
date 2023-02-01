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
  popupItem.addEventListener('mousedown', closePopupthroughOverlay);
});

//функция изменения текст кнопки модального окна на момент обновление данных 
export const renderButtonText = (button, text) => {
    button.textContent = text;
};

//текст для модальных окон на момент обновление данных и после обновление данных
export const textButtonSaveLoading = 'Сохранение...'; 
export const textButtonSaveNoLoading = 'Сохранить';
export const textButtonСreatLoading = 'Создание...';
export const textButtonСreatNoLoading = 'Создать';
