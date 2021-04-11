const ACTIVE_CLASSNAME = 'film-card__controls-item--active';

export const createFilmCard = (card) => {
  return `<article class="film-card" data-card-id="${card.cardId}">
    <h3 class="film-card__title">${card.title}</h3>
    <p class="film-card__rating">${card.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${card.yearOfManufacture}</span>
      <span class="film-card__duration">${card.duration}</span>
      <span class="film-card__genre">${card.genres}</span>
    </p>
    <img src="./${card.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${card.description}</p>
      <a class="film-card__comments">${card.comments} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${card.isInWatchlist ? ACTIVE_CLASSNAME : ''}" type="button">Add
          to watchlist
        </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${card.isWatched ? ACTIVE_CLASSNAME : ''}" type="button">Mark
          as watched
        </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${card.isFavorite ? ACTIVE_CLASSNAME : ''}" type="button">Mark as
          favorite
        </button>
      </div>
  </article>`;
};
