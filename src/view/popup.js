import {generateFilmComments} from '../mocks';
import {createElement} from '../utils';

const ACTIVE_CLASSNAME = 'film-details__watched-status--active';
const COMMENTS_COUNT = 10;
const comments = new Array(COMMENTS_COUNT).fill().map(generateFilmComments);

const createGenresStrings = (genres) => {
  const genresTemplatesArray = [];
  genres.forEach((genre) => genresTemplatesArray.push(`<span class="film-details__genre">${genre}</span>`));
  return genresTemplatesArray.join('');
};

const generateComments = () => {
  const commentsTemplatesArray = [];
  for (let i = 0; i < comments.length; i++) {
    commentsTemplatesArray.push(createComments(comments[i]));
  }
  return commentsTemplatesArray.join('');
};

export const radioButtonsChangeHandler = (evt) => {
  const emojiContainer = document.querySelector('.film-details__add-emoji-label');

  if (emojiContainer.firstChild) {
    emojiContainer.firstChild.remove();
  }

  emojiContainer.append(createElement(`<img src="images/emoji/${evt.target.value}.png" alt="${evt.target.value}" width="55" height="55">`));
};

const createComments = (data) => {
  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-${data.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${data.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${data.author}</span>
                <span class="film-details__comment-day">${data.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};

export const createPopup = (data) => {
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${data.poster}" alt="">
          <p class="film-details__age">${data.ageRating} +</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${data.title}</h3>
              <p class="film-details__title-original">${data.alternativeTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${data.rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${data.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${data.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${data.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${data.releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${data.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${data.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${createGenresStrings(data.genres)}
            </tr>
          </table>
          <p class="film-details__film-description">
          ${data.description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${data.isInWatchlist ? ACTIVE_CLASSNAME : ''}">Add to watchlist</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched ${data.isWatched ? ACTIVE_CLASSNAME : ''}">Already watched</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${data.isFavorite ? ACTIVE_CLASSNAME : ''}">Add to favorites</label>
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments
            <span class="film-details__comments-count">${comments.length}</span>
        </h3>
        <ul class="film-details__comments-list">
            ${generateComments()}
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};
