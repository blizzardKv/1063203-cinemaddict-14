const ACTIVE_CLASSNAME = 'film-card__controls-item--active';

export const createFilmCard = (data) => {
  return `<article class="film-card">
    <h3 class="film-card__title">${data.title}</h3>
    <p class="film-card__rating">${data.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${data.yearOfManufacture}</span>
      <span class="film-card__duration">${data.duration}</span>
      <span class="film-card__genre">${data.genre}</span>
    </p>
    <img src="./${data.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${data.description}</p>
      <a class="film-card__comments">${data.comments} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${data.isInWatchlist ? ACTIVE_CLASSNAME : ''}" type="button">Add
          to watchlist
        </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${data.isWatched ? ACTIVE_CLASSNAME : ''}" type="button">Mark
          as watched
        </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${data.isFavorite ? ACTIVE_CLASSNAME : ''}" type="button">Mark as
          favorite
        </button>
      </div>
  </article>`;
};
