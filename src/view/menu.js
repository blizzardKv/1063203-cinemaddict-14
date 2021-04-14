import {setWordFirstLetterToCapital} from '../utils';

const filmsToFilterMap = {
  watchlist: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isInWatchlist).length,
  watched: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isWatched).length,
  favorites: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isFavorite).length,
};

const SortNames = {
  DATE: 'date',
  RATING: 'rating',
};

export const sortByDate = (data) => {
  return [...data].sort((a, b) => {
    if (a.releaseDate > b.releaseDate) {
      return 1;
    }

    if (a.releaseDate < b.releaseDate) {
      return -1;
    }

    return 0;
  });
};

const createFilters = (filmCardsData) => {
  return Object.entries(filmsToFilterMap)
    .map(([filterName, filmsCount]) => {
      return createFiltersTemplate(filterName, filmsCount(filmCardsData));
    })
    .join((''));
};

const createSortCategorites = () => {
  return Object.values(SortNames)
    .map((sortName) => {
      return createSortTemplate(sortName);
    })
    .join((''));
};

const createFiltersTemplate = (filterName, filmsCount) => {
  return `<a href="#${filterName}" class="main-navigation__item">${setWordFirstLetterToCapital(filterName)} <span class="main-navigation__item-count">${filmsCount}</span></a>`;
};

const createSortTemplate = (sortName) => {
  return `<li><a href="#" class="sort__button" data-sort-id="${sortName}">Sort by ${sortName}</a></li>`;
};

export const createMenu = (filmCardsData) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createFilters(filmCardsData)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-id="all">Sort by default</a></li>
    ${createSortCategorites(SortNames)}
  </ul>`;
};
