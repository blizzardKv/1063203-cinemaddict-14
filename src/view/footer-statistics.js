import AbstractView from './abstract';

const createFooterStatistics = (filmsCount) => {
  return `<section class="footer__statistics">
    <p>${filmsCount} movies inside</p>
  </section>`;
};

export default class FooterStatistics extends AbstractView {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsCount);
  }
}
