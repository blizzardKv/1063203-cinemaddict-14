import {createElement} from '../utils';

export default class FilmListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return this.createFilmListContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  createFilmListContainer() {
    return `<section class="films">
        <section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container"></div>
        </section>
    </section>`;
  }

  removeElement() {
    this._element = null;
  }
}
