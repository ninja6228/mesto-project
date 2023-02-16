class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }
  // Метод перебора всех элементов
  rendererItem() {
    this._items.forEach(item => this._renderer(item));
  }
  // Метод добавление элемента в DOM
  addItem(item) {
    this._selector.prepend(item);
  }
}