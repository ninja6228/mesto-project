export default class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  // Метод проверка ответа от серевера
  _checkAnswer(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkAnswer);
  }

  // Метод для получение с сервера обькта с карточками
  apiCards() {
    return this._request(`${this._link}/cards`, { headers: this._headers })
  }


  // Метод получение с сервера обьекта с данными пользывателя
  apiUser() {
    return this._request(`${this._link}/users/me`, { headers: this._headers })
  }

  // Метод передачи данных пользывателя на сервер
  setUserInfo({ name, about }) {
    return this._request(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
  }

  // Метод передачи новой аватарки на сервер
  setUserAvatar(urlAvatar) {
    return this._request(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: urlAvatar
      })
    })
  }

  // Метод публикации новой карточки на сервер 
  setAddNewCard(cardData) {
    return this._request(`${this._link}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
  }

  // Метод удаления карточки по id c сервера
  deleteCardApi(idCard) {
    return this._request(`${this._link}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Метод удаления лайка по id c сервера
  deleteLikeApi(idCard) {
    return this._request(`${this._link}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Метод добавления лайка по id c сервера
  addLikeApi(idCard) {
    return this._request(`${this._link}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this._headers
    })
  }
}
