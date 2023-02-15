export class Api {
  constructor({ link, headers }) {
    this.link = link;
    this.headers = headers;
  }

  // Метод проверка ответа от серевера
  _checkAnswer(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  // Метод для получение с сервера обькта с карточками
  apiCards() {
    return fetch(`${this.link}/cards`, { headers: this.headers })
      .then(res => this._checkAnswer(res));
  }


  // Метод получение с сервера обьекта с данными пользывателя
  apiUser() {
    return fetch(`${this.link}/users/me`, { headers: this.headers })
      .then(res => this._checkAnswer(res));
  }

  // Метод передачи данных пользывателя на сервер
  setUserInfo(profileData) {
    return fetch(`${this.link}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: profileData.username,
        about: profileData.description
      })
    })
      .then(res => this._checkAnswer(res));
  }

  // Метод передачи новой аватарки на сервер
  setUserAvatar(urlAvatar) {
    return fetch(`${this.link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: urlAvatar
      })
    })
      .then(res => this._checkAnswer(res));
  }

  // Метод публикации новой карточки на сервер 
  setAddNewCard(cardData) {
    return fetch(`${this.link}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(res => this._checkAnswer(res));
  }

  // Метод удаления карточки по id c сервера
  deletiCardApi(idCard) {
    return fetch(`${this.link}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._checkAnswer(res));
  }

  // Метод удаления лайка по id c сервера
  deletelikeApi(idCard) {
    return fetch(`${this.link}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._checkAnswer(res));
  }

  // Метод добавления лайка по id c сервера
  addlikeApi(idCard) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this._checkAnswer(res));
  }
}