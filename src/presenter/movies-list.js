import EmptyFilmCardView from '../view/empty-film-card';
import SortView from '../view/sort';
import FilmListContainerView from '../view/film-list-container';
import UserRankView from '../view/user-rank';
import ShowMoreButtonView from '../view/show-more-button';
import MenuView from '../view/menu';
import ExtraFilmsWrapperView from '../view/extra-films-wrapper';
import MoviePresenter from './movie';
import {render, RenderPosition} from '../utils/render';

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
    this._userRankInstance = new UserRankView();
    this._filmCardContainerInstance = new FilmListContainerView();
    this._showMoreButtonInstance = new ShowMoreButtonView();
  }

  init() {
    render(header, this._userRankComponent, RenderPosition.BEFOREEND);
    this._renderPage();
  }

  _userRankComponent() {
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
    this._renderMainMovies();

    if (this._filmCards.length > CARDS_SHOW_STEP) {
      this._renderShowMoreButton();
    }

    this._renderExtraMovies();
  }

  _renderMainMovies() {
    let moviePresenter;

    for (let i = 0; i < this._getAvailableCardsLength(); i++) {
      moviePresenter = new MoviePresenter({
        container: this._filmCardContainerInstance.getElement().querySelector('.films-list__container'),
        filmData: this._filmCards[i],
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

  _renderShowMoreButton() {
    render(this._filmCardContainerInstance.getElement().querySelector('.films-list'), this._showMoreButtonInstance, RenderPosition.BEFOREEND);
  }

  _renderExtraMovies() {
    this._topRatedExtraWrapperInstance = new ExtraFilmsWrapperView('Top rated');
    this._mostCommentedExtraWrapperInstance = new ExtraFilmsWrapperView('Most commented');

    render(this._filmCardContainerInstance.getElement(), this._topRatedExtraWrapperInstance, RenderPosition.BEFOREEND);
    render(this._filmCardContainerInstance.getElement(), this._mostCommentedExtraWrapperInstance, RenderPosition.BEFOREEND);

    console.log(this._topRatedExtraWrapperInstance.getElement());

    let moviePresenter;

    for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
      moviePresenter = new MoviePresenter({
        container: this._topRatedExtraWrapperInstance.getElement(),
        filmData: this._filmCards[i],
      });

      moviePresenter._renderFilm();
    }
  }
}
