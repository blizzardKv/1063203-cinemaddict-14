import {createElement, getRandomInteger} from '../utils';
import {generateFilmComments} from '../mocks/comments';
import {AVAILABLE_EMOTIONS} from '../const';

const COMMENTS_COUNT = getRandomInteger(1, 20);
const comments = new Array(COMMENTS_COUNT).fill().map(generateFilmComments);

const generateComments = (targetCommentId) => {
  return comments.filter((comment) => comment.commentId === targetCommentId)
    .map((comment) => createCommentListItem(comment))
    .join('');
};

const generateEmojis = (emojis) => {
  return emojis
    .map((emoji) => createEmojiTemplate(emoji))
    .join('');
};

const countAppropriateCommentsLength = (filmCommentsId, comments) => {
  return comments.filter((comment) => comment.commentId === filmCommentsId).length;
};

const createEmojiTemplate = (emoji) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
            </label>`;
};

const createCommentListItem = (commentCurrentData) => {
  const {
    emotion,
    comment,
    author,
    date,
  } = commentCurrentData;
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

export default class Comments {
  constructor() {
    this._element = null;
  }

  getTemplate(targetCommentId) {
    return this.createComments(targetCommentId);
  }

  getElement(targetCommentId) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(targetCommentId));
    }

    return this._element;
  }

  createComments(targetCommentId) {
    return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments
            <span class="film-details__comments-count">${countAppropriateCommentsLength(0, comments)}</span>
        </h3>
        <ul class="film-details__comments-list">
            ${generateComments(0, targetCommentId)}
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
    </div>`;
  }

  removeElement() {
    this._element = null;
  }
}
