import {createMenu} from './view/menu';
import {createFilmCard} from './view/filmCard';
import {createUserRank} from './view/userRank';
import {createFilmListContainer} from './view/filmListContainer';
import {createShowMoreButton} from './view/showMoreButton';
import {createExtraFilmsWrapper} from './view/extraFilmsWrapper';
import {createFooterStatistics} from './view/footerStatistics';
import {createPopup, radioButtonsChangeHandler} from './view/popup';
import {generateFilmMocksData} from './mocks';
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

const renderComponent = (container, markup, insertPlace = 'beforeend') => {
  container.insertAdjacentHTML(insertPlace, markup);
};

const CARDS_SHOW_STEP = 5;
const MAX_CARDS_COUNT = 20;
const ESCAPE_BUTTON = 'Escape';
const ACTIVE_NAVIGATION_ITEM_CLASS_NAME = 'main-navigation__item--active';
const ACTIVE_SORT_BUTTON_CLASS_NAME = 'sort__button--active';
const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const mostRatedFilmsData = transpileDataForExtraCategories(sortByRatingData(filmCards));
const mostCommentedFilmsData = transpileDataForExtraCategories(sortByRatingData(filmCards));
const moviesWatchedByUser = countWatchedFilms(filmCards);

const popupShowHandler = ({ target }) => {
  const clickTargets = ['film-card__title', 'film-card__poster', 'film-card__comments'];
  const checkClickableElement = clickTargets.find((element) => element === target.className);
  if (target.classList.contains(checkClickableElement)) {
    const currentPopupId = target.closest('.film-card').dataset.cardId;
    renderComponent(mainWrapper, createPopup(findArrayElement(filmCards, currentPopupId)));
    const closeBtn = mainWrapper.querySelector('.film-details__close-btn');
    closeBtn.addEventListener('click', closeModalHandler);
    getCheckedEmoji();
  }
};

const closeModalHandler = (evt) => {
  const filmDetailsModal = mainWrapper.querySelector('.film-details');
  if (filmDetailsModal && evt.key === ESCAPE_BUTTON) {
    filmDetailsModal.remove();
    evt.target.removeEventListener('click', closeModalHandler);
  }
};

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

const getCheckedEmoji = () => {
  const radioButtons = document.querySelectorAll('.film-details__emoji-item');

  radioButtons.forEach((btn) => {
    btn.addEventListener('change', radioButtonsChangeHandler);
  });
};

getCheckedEmoji();

const navigationItemHandler = (evt) => {
  mainNavigationItems.forEach((item) => {
    item.classList.remove(ACTIVE_NAVIGATION_ITEM_CLASS_NAME);
  });
  evt.target.classList.add(ACTIVE_NAVIGATION_ITEM_CLASS_NAME);
  const sortAttribute = evt.target.closest('.main-navigation__item').getAttribute('href').substr(1);
  let filteredFilmData;
  switch (sortAttribute) {
    case 'watchlist':
      filteredFilmData = filterByFilmsInWatchlist(filmCards);
      break;
    case 'history':
      filteredFilmData = filterByWatchedFilms(filmCards);
      break;
    case 'favorites':
      filteredFilmData = filterByFavoriteFilms(filmCards);
      break;
    default:
      filteredFilmData = filmCards;
  }

  removeRenderedCards();
  renderFilmCardMultipleTimes(filteredFilmData);
};

const sortButtonHandler = (evt) => {
  evt.preventDefault();
  sortButtons.forEach((btn) => {
    btn.classList.remove(ACTIVE_SORT_BUTTON_CLASS_NAME);
  });
  evt.target.classList.add(ACTIVE_SORT_BUTTON_CLASS_NAME);
  const sortAttribute = evt.target.dataset.sortId;

  let filteredFilmData;
  switch (sortAttribute) {
    case 'rating':
      filteredFilmData = sortByRatingData(filmCards);
      break;
    case 'date':
      filteredFilmData = sortByDate(filmCards);
      break;
    default:
      filteredFilmData = filmCards;
  }

  removeRenderedCards();
  renderFilmCardMultipleTimes(filteredFilmData);
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
const mainNavigationItems = mainWrapper.querySelectorAll('.main-navigation__item');
const sortButtons = mainWrapper.querySelectorAll('.sort__button');

const renderFilmCardMultipleTimes = (cards) => {
  for (let i = 0; i < CARDS_SHOW_STEP; i++) {
    renderComponent(filmListWrapper, createFilmCard(cards[i]));
  }
};

renderFilmCardMultipleTimes(filmCards);

if (filmCards.length > CARDS_SHOW_STEP) {
  window.renderedCards = CARDS_SHOW_STEP;

  renderComponent(filmsList, createShowMoreButton());

  window.showMoreButton = filmsList.querySelector('.films-list__show-more');

  window.showMoreButton.addEventListener('click', showMoreButtonHandler);
}

renderComponent(filmsSection, createExtraFilmsWrapper('Top rated'));
renderComponent(filmsSection, createExtraFilmsWrapper('Most commented'));

const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');
const topRatedFilmsContainer = extraWrappers[0].querySelector('.films-list__container');
const topCommentedFilmsContainer = extraWrappers[1].querySelector('.films-list__container');

mostRatedFilmsData.forEach((film) => renderComponent(topRatedFilmsContainer, createFilmCard(film)));
mostCommentedFilmsData.forEach((film) => renderComponent(topCommentedFilmsContainer, createFilmCard(film)));

renderComponent(footerStatistics, createFooterStatistics(MAX_CARDS_COUNT));

mainWrapper.addEventListener('click', popupShowHandler, true);
document.addEventListener('keydown', closeModalHandler);
mainNavigationItems.forEach((item) => item.addEventListener('click', navigationItemHandler));
sortButtons.forEach((btn) => btn.addEventListener('click', sortButtonHandler));
