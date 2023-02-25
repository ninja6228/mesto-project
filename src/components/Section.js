export class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }
  // Метод перебора всех элементов
  rendererItem(items) {
    items.forEach(item => this._renderer(item));
  }
  // Метод добавление элемента в DOM
  addItem(item) {
    this._container.prepend(item);
  }
}