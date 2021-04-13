import {FILTERS} from '../const';
import {countWatchedFilms, countFavoritesFilms, countAddedToWatchlistFilms} from '../utils';

export const filterByWatchedFilms = (data) => {
  return data.filter((item) => item.isWatched);
};

export const filterByFavoriteFilms = (data) => {
  return data.filter((item) => item.isFavorite);
};

export const filterByFilmsInWatchlist = (data) => {
  return data.filter((item) => item.isInWatchlist);
};

export const sortByRatingData = (data) => {
  return [...data].sort((a, b) => {
    if (a.rating > b.rating) {
      return 1;
    }

    if (a.rating < b.rating) {
      return -1;
    }

    return 0;
  });
};

export const sortByCommentsNumberData = (data) => {
  return [...data].sort((a, b) => {
    if (a.comments > b.comments) {
      return 1;
    }

    if (a.comments < b.comments) {
      return -1;
    }

    return 0;
  });
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

const createFilters = (data) => {
  const sectionsCounts = [countAddedToWatchlistFilms(data), countWatchedFilms(data), countFavoritesFilms(data)];
  const filtersArray = [];
  FILTERS.forEach((filter, i) => {
    filtersArray.push(`<a href="#watchlist" class="main-navigation__item">${filter} <span class="main-navigation__item-count">${sectionsCounts[i]}</span></a>`);
  });

  return filtersArray.join('');
};

export const createMenu = (data) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createFilters(data)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-id="all">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-id="date">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-id="rating">Sort by rating</a></li>
  </ul>`;
};
