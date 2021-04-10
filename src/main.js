import {createMenu} from './view/menu';
import {createFilmCard} from './view/filmCard';
import {createUserRank} from './view/userRank';
import {createFilmListContainer} from './view/filmListContainer';
import {createShowMoreButton} from './view/showMoreButton';
import {createExtraFilmsWrapper} from './view/extraFilmsWrapper';
import {createFooterStatistics} from './view/footerStatistics';
import {createPopup} from './view/popup';
import {generateFilmMocksData} from './mocks';
import {countFavoritesFilms,
  countWatchedFilms,
  countAddedToWatchlistFilms,
  sortByRatingData,
  sortByCommentsNumberData,
  findArrayElement
} from './utils';
const CARDS_SHOW_STEP = 5;
const MAX_CARDS_COUNT = 20;
const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const mostRatedFilmsData = sortByRatingData(filmCards);
const mostCommentedFilmsData = sortByCommentsNumberData(filmCards);

const renderComponent = (container, markup, insertPlace = 'beforeend') => {
  container.insertAdjacentHTML(insertPlace, markup);
};

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

renderComponent(header, createUserRank());
renderComponent(mainWrapper, createMenu(countAddedToWatchlistFilms(filmCards), countWatchedFilms(filmCards),countFavoritesFilms(filmCards)));
renderComponent(mainWrapper, createFilmListContainer());

const filmsSection = mainWrapper.querySelector('.films');
const filmsList = filmsSection.querySelector('.films-list');
const filmListWrapper = filmsSection.querySelector('.films-list__container');

const renderFilmCardMultipleTimes = () => {
  for (let i = 0; i < CARDS_SHOW_STEP; i++) {
    renderComponent(filmListWrapper, createFilmCard(filmCards[i]));
  }
};

mainWrapper.addEventListener('click', ({ target }) => {
  const clickTargets = ['film-card__title', 'film-card__poster', 'film-card__comments'];
  const checkClickableElement = clickTargets.find((element) => element === target.className);
  if (target.classList.contains(checkClickableElement)) {
    const currentPopupId = target.closest('.film-card').dataset.cardId;
    renderComponent(mainWrapper, createPopup(findArrayElement(filmCards, currentPopupId)));
    const closeBtn = mainWrapper.querySelector('.film-details__close-btn');
    closeBtn.addEventListener('click', closeModalHandler);
  }
});

const closeModalHandler = (evt) => {
  const filmDetailsModal = mainWrapper.querySelector('.film-details');
  if (filmDetailsModal && evt.key === 'Escape' || evt.pointerType === 'mouse') {
    filmDetailsModal.remove();
    evt.target.removeEventListener('click', closeModalHandler);
  }
};

document.addEventListener('keydown', closeModalHandler);

renderFilmCardMultipleTimes();

if (filmCards.length > CARDS_SHOW_STEP) {
  let renderedCards = CARDS_SHOW_STEP;

  renderComponent(filmsList, createShowMoreButton());

  const showMoreButton = filmsList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards.slice(renderedCards, renderedCards + CARDS_SHOW_STEP).forEach((card) => {
      renderComponent(filmListWrapper, createFilmCard(card));
    });
    renderedCards += CARDS_SHOW_STEP;

    if (renderedCards >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

renderComponent(filmsSection, createExtraFilmsWrapper('Top rated'));
renderComponent(filmsSection, createExtraFilmsWrapper('Most commented'));

const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');
const topRatedFilmsContainer = extraWrappers[0].querySelector('.films-list__container');
const topCommentedFilmsContainer = extraWrappers[1].querySelector('.films-list__container');

mostRatedFilmsData.forEach((film) => renderComponent(topRatedFilmsContainer, createFilmCard(film)));
mostCommentedFilmsData.forEach((film) => renderComponent(topCommentedFilmsContainer, createFilmCard(film)));

renderComponent(footerStatistics, createFooterStatistics());
