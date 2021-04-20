import {createElement} from '../utils';

export default class EmptyFilmCard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return this.createEmptyFilmCard();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  createEmptyFilmCard() {
    return `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`;
  }

  removeElement() {
    this._element = null;
  }
}
