import {createMenu} from './view/menu';
import {createFilmCard} from './view/filmCard';
import {createUserRank} from './view/userRank';
import {createFilmListContainer} from './view/filmListContainer';
import {createShowMoreButton} from './view/showMoreButton';
import {createExtraFilmsWrapper} from './view/extraFilmsWrapper';
import {createFooterStatistics} from './view/footerStatistics';
import {createSort} from './view/sort';
import {createPopup} from './view/popup';
import {generateFilmMocksData,
  MAX_CARDS_COUNT,
  POPUP_ITEM_ID
} from './mocks/film';
import {countWatchedFilms,
  findArrayElement,
  sortByRatingData,
  sortByCommentsNumberData
} from './utils';

const EXTRA_CARDS_COUNT = 2;
const CARDS_SHOW_STEP = 5;

const renderComponent = (container, markup, insertPlace = 'beforeend') => {
  container.insertAdjacentHTML(insertPlace, markup);
};

const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const moviesWatchedByUser = countWatchedFilms(filmCards);

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

renderComponent(header, createUserRank(moviesWatchedByUser));
renderComponent(mainWrapper, createMenu(filmCards));
renderComponent(mainWrapper, createSort());
renderComponent(mainWrapper, createFilmListContainer());

const filmsSection = mainWrapper.querySelector('.films');
const filmsList = filmsSection.querySelector('.films-list');
const filmListWrapper = filmsSection.querySelector('.films-list__container');

const renderFilmCardMultipleTimes = (container, cards, iterationsNumber) => {
  for (let i = 0; i < iterationsNumber; i++) {
    renderComponent(container, createFilmCard(cards[i]));
  }
};

renderFilmCardMultipleTimes(filmListWrapper, filmCards, CARDS_SHOW_STEP);

renderComponent(filmsSection, createExtraFilmsWrapper('Top rated'));
renderComponent(filmsSection, createExtraFilmsWrapper('Most commented'));
renderComponent(footerStatistics, createFooterStatistics(MAX_CARDS_COUNT));
renderComponent(mainWrapper, createPopup(findArrayElement(filmCards, POPUP_ITEM_ID)));

const showMoreButtonHandler = (evt) => {
  evt.preventDefault();
  filmCards.slice(renderedCards, renderedCards + CARDS_SHOW_STEP).forEach((card) => {
    renderComponent(filmListWrapper, createFilmCard(card));
  });
  renderedCards += CARDS_SHOW_STEP;

  if (renderedCards >= filmCards.length) {
    showMoreButton.remove();
  }
};

const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');
const topRatedFilmsWrapper = extraWrappers[0].querySelector('.films-list__container');
const mostCommentedFilmsWrapper = extraWrappers[1].querySelector('.films-list__container');

renderFilmCardMultipleTimes(topRatedFilmsWrapper, sortByRatingData(filmCards), EXTRA_CARDS_COUNT);
renderFilmCardMultipleTimes(mostCommentedFilmsWrapper, sortByCommentsNumberData(filmCards), EXTRA_CARDS_COUNT);

let renderedCards, showMoreButton;

if (filmCards.length > CARDS_SHOW_STEP) {
  renderedCards = CARDS_SHOW_STEP;

  renderComponent(filmsList, createShowMoreButton());

  showMoreButton = filmsList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', showMoreButtonHandler);
}

