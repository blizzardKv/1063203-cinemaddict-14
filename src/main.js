import {createMenu} from './view/menu';
import {createFilmCard} from './view/filmCard';
import {createUserRank} from './view/userRank';
import {createFilmListContainer} from './view/filmListContainer';
import {createShowMoreButton} from './view/showMoreButton';
import {createExtraFilmsWrapper} from './view/extraFilmsWrapper';
import {createFooterStatistics} from './view/footerStatistics';
import {createPopup} from './view/popup';
import {generateFilmMocksData,
  CARDS_SHOW_STEP,
  MAX_CARDS_COUNT,
  POPUP_ITEM_ID
} from './mocks';
import {countFavoritesFilms,
  countWatchedFilms,
  countAddedToWatchlistFilms,
  sortByRatingData,
  findArrayElement,
  filterByWatchedFilms,
  filterByFilmsInWatchlist,
  filterByFavoriteFilms,
  transpileDataForExtraCategories,
  removeRenderedCards,
  sortByDate
} from './utils';
import {
  ACTIVE_NAVIGATION_ITEM_CLASS_NAME,
  ACTIVE_SORT_BUTTON_CLASS_NAME,
  EXTRA_CARDS_COUNT
} from './const';

const renderComponent = (container, markup, insertPlace = 'beforeend') => {
  container.insertAdjacentHTML(insertPlace, markup);
};

const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const mostRatedFilmsData = transpileDataForExtraCategories(sortByRatingData(filmCards));
const mostCommentedFilmsData = transpileDataForExtraCategories(sortByRatingData(filmCards));
const moviesWatchedByUser = countWatchedFilms(filmCards);

const showMoreButtonHandler = (evt) => {
  evt.preventDefault();
  filmCards.slice(window.renderedCards, window.renderedCards + CARDS_SHOW_STEP).forEach((card) => {
    renderComponent(filmListWrapper, createFilmCard(card));
  });
  window.renderedCards += CARDS_SHOW_STEP;

  if (window.renderedCards >= filmCards.length) {
    window.showMoreButton.remove();
  }
};

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

renderComponent(header, createUserRank(moviesWatchedByUser));
renderComponent(mainWrapper, createMenu(countAddedToWatchlistFilms(filmCards), countWatchedFilms(filmCards),countFavoritesFilms(filmCards)));
renderComponent(mainWrapper, createFilmListContainer());

const filmsSection = mainWrapper.querySelector('.films');
const filmsList = filmsSection.querySelector('.films-list');
const filmListWrapper = filmsSection.querySelector('.films-list__container');

const renderFilmCardMultipleTimes = (cards) => {
  for (let i = 0; i < CARDS_SHOW_STEP; i++) {
    renderComponent(filmListWrapper, createFilmCard(cards[i]));
  }
};

const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');

extraWrappers.forEach((wrapper) => {
  const filmWrapper = wrapper.querySelector('.films-list__container');
  const renderFilmCardMultipleTimes = () => {
    for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
      renderComponent(filmWrapper, createFilmCard());
    }
  };
  renderFilmCardMultipleTimes();
});

renderFilmCardMultipleTimes(filmCards);

renderComponent(filmsSection, createExtraFilmsWrapper('Top rated'));
renderComponent(filmsSection, createExtraFilmsWrapper('Most commented'));
renderComponent(footerStatistics, createFooterStatistics(MAX_CARDS_COUNT));
renderComponent(mainWrapper, createPopup(findArrayElement(filmCards, POPUP_ITEM_ID)));

if (filmCards.length > CARDS_SHOW_STEP) {
  window.renderedCards = CARDS_SHOW_STEP;

  renderComponent(filmsList, createShowMoreButton());

  window.showMoreButton = filmsList.querySelector('.films-list__show-more');

  window.showMoreButton.addEventListener('click', showMoreButtonHandler);
}

