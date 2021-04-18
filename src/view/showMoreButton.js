import {createElement, render} from '../utils';
import FilmCardView from './filmCard';

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return this.createShowMoreButton();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  createShowMoreButton() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  removeElement() {
    this._element = null;
  }
}
