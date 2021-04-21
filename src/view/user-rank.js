import {RankingLimits} from '../const';
import {createElement, setWordFirstLetterToCapital} from '../utils';

const countUserRank = (filmsCount) => {
  if (filmsCount >= RankingLimits.NOVICE_LOWER_MARK
    && filmsCount <= RankingLimits.NOVICE_UPPER_MARK) {
    return 'novice';
  }

  if (filmsCount >= RankingLimits.FAN_LOWER_MARK
    && filmsCount <= RankingLimits.FAN_UPPER_MARK) {
    return 'fan';
  }

  if (filmsCount >= RankingLimits.MOVIE_BUFF_LOWER_MARK) {
    return 'movie buff';
  }

  return '';
};

const createUserRank = (moviesWatchedByUser) => {
  if (countUserRank(moviesWatchedByUser) === '') {
    return;
  }

  return `<section class="header__profile profile">
    <p class="profile__rating">${setWordFirstLetterToCapital(countUserRank(moviesWatchedByUser))}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserRank {
  constructor(moviesWatchedByUser) {
    this._moviesWatchedByUser = moviesWatchedByUser;
    this._element = null;
  }

  getTemplate() {
    return createUserRank(this._moviesWatchedByUser);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
