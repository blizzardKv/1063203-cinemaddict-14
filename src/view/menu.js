import {createElement, setWordFirstLetterToCapital} from '../utils';

const ACTIVE_FILTER_CLASS_NAME = 'main-navigation__item--active';
const ALL_FILMS_FILTER_NAME = 'all';

const filmsToFilterMap = {
  all: (filmCards) => filmCards
    .filter((filmCard) => filmCard).length,
  watchlist: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isInWatchlist).length,
  watched: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isWatched).length,
  favorites: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isFavorite).length,
};

const createFilters = (filmCardsData) => {
  return Object.entries(filmsToFilterMap)
    .map(([filterName, filmsCount]) => {
      return createFiltersTemplate(filterName, filmsCount(filmCardsData));
    })
    .join((''));
};

const createFiltersTemplate = (filterName, filmsCount) => {
  return `<a href="#${filterName}" class="main-navigation__item ${filterName === ALL_FILMS_FILTER_NAME ? ACTIVE_FILTER_CLASS_NAME : ''}">
    ${setWordFirstLetterToCapital(filterName === ALL_FILMS_FILTER_NAME ? 'all movies' : filterName)}
    ${filterName !== ALL_FILMS_FILTER_NAME ? `<span class="main-navigation__item-count">${filmsCount}</span></a>` : ''}`;
};

const createMenu = (filmCardsData) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${createFilters(filmCardsData)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Menu {
  constructor(filmCardsData) {
    this._filmCardsData = filmCardsData;

    this._element = null;
  }

  getTemplate() {
    return createMenu(this._filmCardsData);
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
