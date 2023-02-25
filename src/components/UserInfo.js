export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._userName = document.querySelector(name);
    this._userDescription = document.querySelector(description);
    this._userAvatar = document.querySelector(avatar);
  }
  // Метод который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    };
  }
  // Метод который принимает новые данные пользователя
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
  }
  // Метод для изменения аватарки 
  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}

