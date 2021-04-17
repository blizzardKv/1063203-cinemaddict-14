import {generateFilmComments} from '../mocks/comments';
import {getRandomInteger} from '../utils';
import {AVAILABLE_EMOTIONS} from '../const';

const COMMENTS_COUNT = getRandomInteger(1, 20);
const comments = new Array(COMMENTS_COUNT).fill().map(generateFilmComments);
const ACTIVE_WATCHED_STATUS_CLASS_NAME = 'film-details__watched-status--active';

const generateGenresStrings = (genres) => {
  return genres
    .map((genre) => createGenreItemTemplate(genre))
    .join('');
};

const generateComments = (comments) => {
  return comments
    .map((comment) => createComments(comment))
    .join('');
};

const generateEmojis = (emojis) => {
  return emojis
    .map((emoji) => createEmojiTemplate(emoji))
    .join('');
};

const createGenreItemTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createEmojiTemplate = (emoji) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
            </label>`;
};

const createComments = (commentsCurrentData) => {
  const {
    emotion,
    comment,
    author,
    date,
  } = commentsCurrentData;
  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};

export const createPopup = (data) => {
  const {
    title,
    rating,
    duration,
    genres,
    poster,
    description,
    isInWatchlist,
    isWatched,
    isFavorite,
    ageRating,
    alternativeTitle,
    director,
    actors,
    writers,
    releaseDate,
    country,
  } = data;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${ageRating} +</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${generateGenresStrings(genres)}
            </tr>
          </table>
          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${isInWatchlist ? ACTIVE_WATCHED_STATUS_CLASS_NAME : ''}">Add to watchlist</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched ${isWatched ? ACTIVE_WATCHED_STATUS_CLASS_NAME : ''}">Already watched</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${isFavorite ? ACTIVE_WATCHED_STATUS_CLASS_NAME : ''}">Add to favorites</label>
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments
            <span class="film-details__comments-count">${comments.length}</span>
        </h3>
        <ul class="film-details__comments-list">
            ${generateComments(comments)}
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            <img src="images/emoji/${AVAILABLE_EMOTIONS[0]}.png" alt="${AVAILABLE_EMOTIONS[0]}" width="55" height="55">
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            ${generateEmojis(AVAILABLE_EMOTIONS)}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};
