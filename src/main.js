import MenuView from './view/menu';
import FilmCardView from './view/filmCard';
import UserRankView from './view/userRank';
import FilmListContainerView from './view/filmListContainer';
import ShowMoreButtonView from './view/showMoreButton';
import ExtraFilmsWrapperView from './view/extraFilmsWrapper';
import FooterStatisticsView from './view/footerStatistics';
import SortView from './view/sort';
import PopupView from './view/popup';
import CommentsView from './view/popupComments';
import {generateFilmMocksData,
  MAX_CARDS_COUNT,
  POPUP_ITEM_ID
} from './mocks/film';
import {countWatchedFilms,
  findArrayElement,
  sortByRatingData,
  sortByCommentsNumberData,
  render,
  RenderPosition
} from './utils';

const EXTRA_CARDS_COUNT = 2;
const CARDS_SHOW_STEP = 5;

const filmCards = new Array(MAX_CARDS_COUNT).fill().map(generateFilmMocksData);
const FIRST_FILM_CARD_TARGET_COMMENT_ID = filmCards[0].commentsId;
const moviesWatchedByUser = countWatchedFilms(filmCards);

const mainWrapper = document.querySelector('.main');
const header = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

render(header, new UserRankView(moviesWatchedByUser).getElement(), RenderPosition.BEFOREEND);
render(mainWrapper, new MenuView(filmCards).getElement(), RenderPosition.BEFOREEND);
render(mainWrapper, new SortView().getElement(), RenderPosition.BEFOREEND);
render(mainWrapper, new FilmListContainerView().getElement(), RenderPosition.BEFOREEND);

const filmsSection = mainWrapper.querySelector('.films');
const filmsList = filmsSection.querySelector('.films-list');
const filmListWrapper = filmsSection.querySelector('.films-list__container');

const renderFilmCardMultipleTimes = (container, cards, iterationsNumber) => {
  for (let i = 0; i < iterationsNumber; i++) {
    render(container, new FilmCardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

renderFilmCardMultipleTimes(filmListWrapper, filmCards, CARDS_SHOW_STEP);

render(filmsSection, new ExtraFilmsWrapperView('Top rated').getElement(), RenderPosition.BEFOREEND);
render(filmsSection, new ExtraFilmsWrapperView('Most commented').getElement(), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(MAX_CARDS_COUNT).getElement(), RenderPosition.BEFOREEND);
render(mainWrapper, new PopupView(findArrayElement(filmCards, POPUP_ITEM_ID)).getElement(), RenderPosition.BEFOREEND);

const commentsContainer = mainWrapper.querySelector('.film-details__bottom-container');
render(commentsContainer, new CommentsView(FIRST_FILM_CARD_TARGET_COMMENT_ID).getElement(), RenderPosition.BEFOREEND);

const showMoreButtonHandler = (evt) => {
  evt.preventDefault();
  filmCards.slice(renderedCards, renderedCards + CARDS_SHOW_STEP).forEach((card) => {
    render(filmListWrapper, new FilmCardView(card).getElement(), RenderPosition.BEFOREEND);
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

  const showMoreButtonInstance = new ShowMoreButtonView();

  render(filmsList, showMoreButtonInstance.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonInstance._element.addEventListener('click', showMoreButtonHandler);
}

