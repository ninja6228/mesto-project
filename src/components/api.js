export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'fa502774-84af-45f4-983e-9c19482d4caf',
    'Content-Type': 'application/json'
  }
};

// проверка ответа от серевера с выводом ошибки
const checkAnswer = (result) => {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
};


// получение с сервера обькта с карточками
export const apiCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, { headers: apiConfig.headers })
    .then((res) => checkAnswer(res));
};

// получение с сервера обьекта с данными пользывателя
export const apiUser = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, { headers: apiConfig.headers })
    .then((res) => checkAnswer(res));
};

//передача данных пользывателя на сервер
export function setUserInfo(userName, userInfo) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userName,
      about: userInfo
    })
  }).then(checkAnswer);
}

// функция публикации новой карточки на сервер 
export function setAddNewCard(cardName, cardUrl) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardUrl
    })
  }).then(checkAnswer);
}

// функиция передачи новой аватарки на сервер 
export function setUserAvatar(urlAvatar) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: urlAvatar
    })
  }).then(checkAnswer);
}

// функция удаления карточки по id c сервера
export function deletiCardApi(idCard) {
  return fetch(`${apiConfig.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then(checkAnswer);
}

// функция добавления лайка по id c сервера
export function addlikeApi(idCard) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: apiConfig.headers
  }).then(checkAnswer);
}


// функция удаления лайка по id c сервера
export function deletelikeApi(idCard) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then(checkAnswer);
}

export function getAppInfo() {
  return Promise.all([apiUser(), apiCards()]);
}