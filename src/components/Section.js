export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }
  // Метод перебора всех элементов
  rendererItem(items) {
    items.forEach(item => this._renderer(item));
  }
  // Метод добавление элемента в DOM
  addItem(item) {
    this._selector.prepend(item);
  }
}