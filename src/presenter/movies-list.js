import EmptyFilmCardView from '../view/empty-film-card';
import SortView from '../view/sort';
import FilmListContainerView from '../view/film-list-container';
import UserRankView from '../view/user-rank';
import ShowMoreButtonView from '../view/show-more-button';
import MenuView from '../view/menu';
import ExtraFilmsWrapperView from '../view/extra-films-wrapper';
import MoviePresenter from './movie';
import {render, RenderPosition} from '../utils/render';
import {
  countWatchedFilms,
  sortByCommentsNumberData,
  sortByRatingData
} from '../utils/utils';

const header = document.querySelector('.header');
const mainWrapper = document.querySelector('.main');
const CARDS_SHOW_STEP = 5;
const EXTRA_CARDS_COUNT = 2;

export default class MoviesList {
  constructor(filmCards) {
    this._filmCards = filmCards.slice();
    this._emptyFilmInstance = new EmptyFilmCardView();
    this._sortInstance = new SortView();
    this._menuInstance = new MenuView(this._filmCards);
    this._userRankInstance = new UserRankView(countWatchedFilms(this._filmCards));
    this._filmCardContainerInstance = new FilmListContainerView();
    this._showMoreButtonInstance = new ShowMoreButtonView();
    this._renderedCards = CARDS_SHOW_STEP;
  }

  init() {
    this._renderUserRank();
    this._renderPage();
    this._addEventListeners();
  }

  _addEventListeners() {
    this._showMoreButtonInstance.getElement().addEventListener('click', this._showMoreButtonHandler.bind(this));
  }

  _renderUserRank() {
    render(header, this._userRankInstance, RenderPosition.BEFOREEND);
  }

  _renderPage() {
    if (!this._filmCards.length) {
      this._renderEmptyList();
    } else {
      this._renderPageContent();
    }
  }

  _renderEmptyList() {
    render(mainWrapper, this._emptyFilmInstance, RenderPosition.BEFOREEND);
  }

  _renderPageContent() {
    render(mainWrapper, this._menuInstance, RenderPosition.BEFOREEND);
    render(mainWrapper, this._sortInstance, RenderPosition.BEFOREEND);
    render(mainWrapper, this._filmCardContainerInstance, RenderPosition.BEFOREEND);
    this._renderMovies();
  }

  _renderMovies() {
    this._renderMainMovies(this._filmCards);

    if (this._filmCards.length > CARDS_SHOW_STEP) {
      this._renderShowMoreButton();
    }

    this._renderExtraMoviesContainers();
  }

  _renderMainMovies(filmCards) {
    let moviePresenter;

    for (let i = 0; i < this._getAvailableCardsLength(); i++) {
      moviePresenter = new MoviePresenter({
        container: this._filmCardContainerInstance.getElement().querySelector('.films-list__container'),
        filmData: filmCards[i],
      });

      moviePresenter._renderFilm();
    }
  }

  _getAvailableCardsLength() {
    if (this._filmCards.length >= CARDS_SHOW_STEP) {
      return CARDS_SHOW_STEP;
    }

    return this._filmCards.length;
  }

  _showMoreButtonHandler() {
    this._renderMainMovies(this._filmCards.slice(this._renderedCards, this._renderedCards + CARDS_SHOW_STEP));

    this._renderedCards += CARDS_SHOW_STEP;

    if (this._renderedCards >= this._filmCards.length) {
      this._showMoreButtonInstance.getElement().remove();
      this._showMoreButtonInstance.removeElement();
    }
  }

  _renderShowMoreButton() {
    render(this._filmCardContainerInstance.getElement().querySelector('.films-list'), this._showMoreButtonInstance, RenderPosition.BEFOREEND);
  }

  _renderExtraMovies(movieInstance, filmData) {
    render(this._filmCardContainerInstance.getElement(), movieInstance, RenderPosition.BEFOREEND);

    let movieItem;

    for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
      movieItem = new MoviePresenter({
        container: movieInstance.getElement().querySelector('.films-list__container'),
        filmData: filmData[i],
      });

      movieItem._renderFilm();
    }
  }

  _renderExtraMoviesContainers() {
    this._topRatedExtraWrapperInstance = new ExtraFilmsWrapperView('Top rated');
    this._mostCommentedExtraWrapperInstance = new ExtraFilmsWrapperView('Most commented');

    this._renderExtraMovies(this._topRatedExtraWrapperInstance, sortByRatingData(this._filmCards));
    this._renderExtraMovies(this._mostCommentedExtraWrapperInstance, sortByCommentsNumberData(this._filmCards));
  }
}
