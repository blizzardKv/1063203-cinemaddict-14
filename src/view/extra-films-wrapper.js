import { createElement } from '../utils';

const createExtraFilmsWrapper = (title) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>`;
};

export default class ExtraWrappers {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmsWrapper(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
