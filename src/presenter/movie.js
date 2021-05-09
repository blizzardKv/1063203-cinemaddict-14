import {remove, render, RenderPosition} from '../utils/render';
import FilmCardView from '../view/film-card';
import {getRandomInteger} from '../utils/utils';
import PopupView from '../view/popup';
import CommentsView from '../view/comments';
import {docBody, ESCAPE} from '../const';

export default class Movie {
  constructor(filmProperties) {
    this._filmProperties = filmProperties;
    this._container = this._filmProperties.container;
    this._filmCardInstance = new FilmCardView(this._filmProperties.filmData);
    this._addEventListeners();
  }

  _addEventListeners() {
    this._filmCardInstance.setClickHandler(() => this._popupShowHandler());
  }

  _renderFilm() {
    render(this._container, this._filmCardInstance, RenderPosition.BEFOREEND);
  }

  static toggleBodyOverflow() {
    docBody.classList.toggle('hide-overflow');
  }

  _popupShowHandler() {
    Movie.toggleBodyOverflow();
    const targetCommentsId = getRandomInteger(0, 3);

    this._filmPopupInstance = new PopupView(this._filmProperties.filmData);
    this._commentsInstance = new CommentsView();

    const filmPopupTemplate = this._filmPopupInstance.getElement();
    docBody.appendChild(filmPopupTemplate);

    const commentsContainer = filmPopupTemplate.querySelector('.film-details__bottom-container');
    render(commentsContainer, this._commentsInstance.getElement(targetCommentsId), RenderPosition.BEFOREEND);

    this._filmPopupInstance.setClickHandler(() => this._closeHandler());
    document.addEventListener('keydown', this._keydownHandler.bind(this));
  }

  _closeHandler() {
    Movie.toggleBodyOverflow();
    this._filmPopupInstance.getElement().querySelector('.film-details__close-btn').removeEventListener('click', this._closeHandler);
    remove(this._filmPopupInstance);
    remove(this._commentsInstance);
    document.removeEventListener('keydown', this._keydownHandler);
  }

  _keydownHandler(evt) {
    if (evt.key === ESCAPE) {
      this._closeHandler();
    }
  }
}
