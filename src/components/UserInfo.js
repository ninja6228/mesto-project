export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._userName = document.querySelector(name);
    this._userDescription = document.querySelector(description);
    this._userAvatar = document.querySelector(avatar);
  }
  // Метод который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userDescription.textContent
    };
  }
  // Метод который принимает новые данные пользователя
  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatar;
    this._id = _id;
  }
}

