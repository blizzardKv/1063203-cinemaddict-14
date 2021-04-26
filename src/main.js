import MenuView from './view/menu';
import FilmCardView from './view/film-card';
import UserRankView from './view/user-rank';
import FilmListContainerView from './view/film-list-container';
import ShowMoreButtonView from './view/show-more-button';
import ExtraFilmsWrapperView from './view/extra-films-wrapper';
import FooterStatisticsView from './view/footer-statistics';
import SortView from './view/sort';
import PopupView from './view/popup';
import CommentsView from './view/comments';
import EmptyFilmCardView from './view/empty-film-card';
import {generateFilmMocksData} from './mocks/film';
import {countWatchedFilms,
  sortByRatingData,
  sortByCommentsNumberData,
  getRandomInteger
} from './utils/utils';
import {
  render,
  RenderPosition,
  remove
} from './utils/render';
import { ESCAPE } from './const';

const EXTRA_CARDS_COUNT = 2;
const CARDS_SHOW_STEP = 5;
const MAX_CARDS_COUNT = 20;
const docBody = document.body;

const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const moviesWatchedByUser = countWatchedFilms(filmCards);

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');
let filmPopupInstance, commentsInstance;

render(mainWrapper, new MenuView(filmCards).getElement(), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(MAX_CARDS_COUNT).getElement(), RenderPosition.BEFOREEND);

let renderedCards, showMoreButtonInstance, filmListWrapper;

const showMoreButtonHandler = () => {
  filmCards.slice(renderedCards, renderedCards + CARDS_SHOW_STEP).forEach((card) => {
    const filmCardInstance = new FilmCardView(card);
    render(filmListWrapper, filmCardInstance.getElement(), RenderPosition.BEFOREEND);
    const interactiveElements = filmCardInstance.getElement().querySelectorAll('.film-card__title, .film-card__poster, .film-card__comments');
    Array.from(interactiveElements).map((element) => element.addEventListener('click', popupShowHandler.bind(null, card)));
  });
  renderedCards += CARDS_SHOW_STEP;

  if (renderedCards >= filmCards.length) {
    showMoreButtonInstance.getElement().remove();
    showMoreButtonInstance.removeElement();
  }
};

const closeHandler = () => {
  docBody.classList.remove('hide-overflow');
  filmPopupInstance.getElement().querySelector('.film-details__close-btn').removeEventListener('click', closeHandler);
  remove(filmPopupInstance);
  remove(commentsInstance);
  document.removeEventListener('keydown', keydownHandler);
};

const keydownHandler = (evt) => {
  if (evt.key === ESCAPE) {
    closeHandler();
  }
};

const popupShowHandler = (filmCard) => {
  docBody.classList.add('hide-overflow');
  const targetCommentsId = getRandomInteger(0, 3);

  filmPopupInstance = new PopupView(filmCard);
  commentsInstance = new CommentsView();

  const filmPopupTemplate = filmPopupInstance.getElement();
  docBody.appendChild(filmPopupTemplate);

  const commentsContainer = filmPopupTemplate.querySelector('.film-details__bottom-container');
  render(commentsContainer, commentsInstance.getElement(targetCommentsId), RenderPosition.BEFOREEND);

  document.addEventListener('keydown', keydownHandler);
  filmPopupTemplate.querySelector('.film-details__close-btn').addEventListener('click', closeHandler);
};

const renderEmptyFilmsListView = () => {
  render(mainWrapper, new EmptyFilmCardView().getElement(), RenderPosition.BEFOREEND);
};

const renderFilmView = () => {
  render(mainWrapper, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(mainWrapper, new FilmListContainerView().getElement(), RenderPosition.BEFOREEND);
  render(header, new UserRankView(moviesWatchedByUser).getElement(), RenderPosition.BEFOREEND);
  const renderFilmCardMultipleTimes = (container, cards, iterationsNumber) => {
    for (let i = 0; i < iterationsNumber; i++) {
      const filmCardInstance = new FilmCardView(cards[i]);
      render(container, filmCardInstance.getElement(), RenderPosition.BEFOREEND);
      const interactiveElements = filmCardInstance.getElement().querySelectorAll('.film-card__title, .film-card__poster, .film-card__comments');
      Array.from(interactiveElements).map((element) => element.addEventListener('click', popupShowHandler.bind(null, cards[i])));
    }
  };

  const filmsSection = mainWrapper.querySelector('.films');
  const filmsList = filmsSection.querySelector('.films-list');
  filmListWrapper = filmsSection.querySelector('.films-list__container');

  showMoreButtonInstance = new ShowMoreButtonView();

  renderFilmCardMultipleTimes(filmListWrapper, filmCards, CARDS_SHOW_STEP);

  render(filmsSection, new ExtraFilmsWrapperView('Top rated').getElement(), RenderPosition.BEFOREEND);
  render(filmsSection, new ExtraFilmsWrapperView('Most commented').getElement(), RenderPosition.BEFOREEND);

  const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');
  const topRatedFilmsWrapper = extraWrappers[0].querySelector('.films-list__container');
  const mostCommentedFilmsWrapper = extraWrappers[1].querySelector('.films-list__container');

  renderFilmCardMultipleTimes(topRatedFilmsWrapper, sortByRatingData(filmCards), EXTRA_CARDS_COUNT);
  renderFilmCardMultipleTimes(mostCommentedFilmsWrapper, sortByCommentsNumberData(filmCards), EXTRA_CARDS_COUNT);

  if (filmCards.length > CARDS_SHOW_STEP) {
    renderedCards = CARDS_SHOW_STEP;

    render(filmsList, showMoreButtonInstance.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonInstance.setClickHandler(() => showMoreButtonHandler());
  }
};

if (!filmCards.length) {
  renderEmptyFilmsListView();
} else {
  renderFilmView();
}
