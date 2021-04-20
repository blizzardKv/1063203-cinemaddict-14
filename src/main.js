import MenuView from './view/menu';
import FilmCardView from './view/filmCard';
import UserRankView from './view/userRank';
import FilmListContainerView from './view/filmListContainer';
import ShowMoreButtonView from './view/showMoreButton';
import ExtraFilmsWrapperView from './view/extraFilmsWrapper';
import FooterStatisticsView from './view/footerStatistics';
import SortView from './view/sort';
import PopupView from './view/popup';
import CommentsView from './view/comments';
import {generateFilmMocksData} from './mocks/film';
import {countWatchedFilms,
  sortByRatingData,
  sortByCommentsNumberData,
  getRandomInteger,
  render,
  RenderPosition
} from './utils';

const EXTRA_CARDS_COUNT = 2;
const CARDS_SHOW_STEP = 5;
const MAX_CARDS_COUNT = 20;

const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const moviesWatchedByUser = countWatchedFilms(filmCards);

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');
let filmPopupInstance, commentsInstance;

render(header, new UserRankView(moviesWatchedByUser).getElement(), RenderPosition.BEFOREEND);
render(mainWrapper, new MenuView(filmCards).getElement(), RenderPosition.BEFOREEND);
render(mainWrapper, new SortView().getElement(), RenderPosition.BEFOREEND);
render(mainWrapper, new FilmListContainerView().getElement(), RenderPosition.BEFOREEND);

const showMoreButtonHandler = (evt) => {
  evt.preventDefault();
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
  document.body.classList.remove('hide-overflow');
  document.body.removeChild(filmPopupInstance.getElement());
  filmPopupInstance.removeElement();
  commentsInstance.removeElement();
  document.removeEventListener('keydown', keydownHandler);
  filmPopupInstance.getElement().querySelector('.film-details__close-btn').removeEventListener('click', closeHandler);
};

const keydownHandler = (evt) => {
  if (evt.key === ESCAPE) {
    closeHandler();
  }
};

const popupShowHandler = (filmCard) => {
  document.body.classList.add('hide-overflow');
  const targetCommentsId = getRandomInteger(0, 3);

  filmPopupInstance = new PopupView(filmCard);
  commentsInstance = new CommentsView();

  const filmPopupTemplate = filmPopupInstance.getElement();
  document.body.appendChild(filmPopupTemplate);

  const commentsContainer = filmPopupTemplate.querySelector('.film-details__bottom-container');
  render(commentsContainer, commentsInstance.getElement(targetCommentsId), RenderPosition.BEFOREEND);

  document.addEventListener('keydown', keydownHandler);
  filmPopupTemplate.querySelector('.film-details__close-btn').addEventListener('click', closeHandler);
};

const filmsSection = mainWrapper.querySelector('.films');
const filmsList = filmsSection.querySelector('.films-list');
const filmListWrapper = filmsSection.querySelector('.films-list__container');

const renderFilmCardMultipleTimes = (container, cards, iterationsNumber) => {
  for (let i = 0; i < iterationsNumber; i++) {
    const filmCardInstance = new FilmCardView(cards[i]);
    render(container, filmCardInstance.getElement(), RenderPosition.BEFOREEND);
    const interactiveElements = filmCardInstance.getElement().querySelectorAll('.film-card__title, .film-card__poster, .film-card__comments');
    Array.from(interactiveElements).map((element) => element.addEventListener('click', popupShowHandler.bind(null, cards[i])));
  }
};

renderFilmCardMultipleTimes(filmListWrapper, filmCards, CARDS_SHOW_STEP);

render(filmsSection, new ExtraFilmsWrapperView('Top rated').getElement(), RenderPosition.BEFOREEND);
render(filmsSection, new ExtraFilmsWrapperView('Most commented').getElement(), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(MAX_CARDS_COUNT).getElement(), RenderPosition.BEFOREEND);

const extraWrappers = mainWrapper.querySelectorAll('.films-list--extra');
const topRatedFilmsWrapper = extraWrappers[0].querySelector('.films-list__container');
const mostCommentedFilmsWrapper = extraWrappers[1].querySelector('.films-list__container');

renderFilmCardMultipleTimes(topRatedFilmsWrapper, sortByRatingData(filmCards), EXTRA_CARDS_COUNT);
renderFilmCardMultipleTimes(mostCommentedFilmsWrapper, sortByCommentsNumberData(filmCards), EXTRA_CARDS_COUNT);

const showMoreButtonInstance = new ShowMoreButtonView();
let renderedCards;

if (filmCards.length > CARDS_SHOW_STEP) {
  renderedCards = CARDS_SHOW_STEP;

  render(filmsList, showMoreButtonInstance.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonInstance.getElement().addEventListener('click', showMoreButtonHandler);
}

