export class UserInfo {
  constructor( object ) {
    this._userName = document.querySelector(object.name);
    this._userDescription = document.querySelector(object.description);
    this._userAvatar = document.querySelector(object.avatar);
  }
  // Метод который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    };
  }
  // Метод который принимает новые данные пользователя
  setUserInfo(object) {
    this._userName.textContent = object.name;
    this._userDescription.textContent = object.about;
  }
  // Метод для изменения аватарки 
  setUserAvatar(object) {
    this._userAvatar.src = object.avatar;
  }
}

