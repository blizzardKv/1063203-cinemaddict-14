import {setWordFirstLetterToCapital} from '../utils';

const filmsToFilterMap = {
  watchlist: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isInWatchlist).length,
  watched: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isWatched).length,
  favorites: (filmCards) => filmCards
    .filter((filmCard) => !filmCard.isFavorite).length,
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

const createFiltersTemplate = (filterName, filmsCount) => {
  return `<a href="#${filterName}" class="main-navigation__item">${setWordFirstLetterToCapital(filterName)} <span class="main-navigation__item-count">${filmsCount}</span></a>`;
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
    <li><a href="#" class="sort__button" data-sort-id="date">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-id="rating">Sort by rating</a></li>
  </ul>`;
};
