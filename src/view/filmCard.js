const ACTIVE_CONTROL_ITEM_CLASS_NAME = 'film-card__controls-item--active';

export const createFilmCard = (card) => {
  const {
    cardId,
    title,
    rating,
    yearOfManufacture,
    duration,
    genres,
    poster,
    description,
    comments,
    isInWatchlist,
    isWatched,
    isFavorite,
  } = card;

  return `<article class="film-card" data-card-id="${cardId}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${yearOfManufacture}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? ACTIVE_CONTROL_ITEM_CLASS_NAME : ''}" type="button">Add
          to watchlist
        </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? ACTIVE_CONTROL_ITEM_CLASS_NAME : ''}" type="button">Mark
          as watched
        </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? ACTIVE_CONTROL_ITEM_CLASS_NAME : ''}" type="button">Mark as
          favorite
        </button>
      </div>
  </article>`;
};
