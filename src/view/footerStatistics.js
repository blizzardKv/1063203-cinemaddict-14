import {createElement} from '../utils';

export default class FooterStatistics {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;

    this._element = null;
  }

  getTemplate() {
    return this.createFooterStatistics(this._filmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  createFooterStatistics(filmsCount) {
    return `<section class="footer__statistics">
    <p>${filmsCount} movies inside</p>
  </section>`;
  }

  removeElement() {
    this._element = null;
  }
}
