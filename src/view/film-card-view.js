import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const createFilmCardTemplate = (data) => {
  const {
    isAddedToWatchList,
    isMarkedAsWatched,
    isFavorit,
    filmName,
    fullDescription,
    comments,
    rating,
    reliseDate,
    runtime,
    genre,
    posterUrl
  } = data;

  const addedToWatchList = isAddedToWatchList
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const markedAsWatched = isMarkedAsWatched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const markedAsFavorite = isFavorit
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmName}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${dayjs(reliseDate).format('YYYY')}</span>
              <span class="film-card__duration">${dayjs.duration(runtime, 'm').hours()}h ${dayjs.duration(runtime, 'm').minutes()}m </span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="${posterUrl}" class="film-card__poster" width="230" height="340" id="${data.id}">
            <p class="film-card__description">${fullDescription}</p>
            <span class="film-card__comments">${comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item ${addedToWatchList}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item ${markedAsWatched}" type="button">Mark as watched</button>
            <button class="film-card__controls-item ${markedAsFavorite}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createFilmCardTemplate(this.#data);
  }

  setPopupClickHandler = (callback) => {
    this._callback.popupClick = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#popupClickHandler);
  }

  #popupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupClick(evt);
  }

  setAddedToWatchClickHandler(callback) {
    this._callback.addedToWatchClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addedToWatchClickHandler);
  }

  setMarkedAsWatchedClickHandler(callback) {
    this._callback.markedAsWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#markedAsWatchedClickHandler);
  }

  setMarkedAsFavoriteClickHandler(callback) {
    this._callback.markedAsFavoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#markedAsFavoriteClickHandler);
  }

  #addedToWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addedToWatchClick();
  }

  #markedAsWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.markedAsWatchedClick();
  }

  #markedAsFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.markedAsFavoriteClick();
  }
}
