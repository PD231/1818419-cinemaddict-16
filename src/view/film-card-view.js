import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createFilmCardTemplate = (data) => `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${data.filmName}</h3>
            <p class="film-card__rating">${data.rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${dayjs(data.reliseDate).format('YYYY')}</span>
              <span class="film-card__duration">${Math.trunc(data.runtime / 60)}h ${(((data.runtime/60)-Math.trunc(data.runtime / 60))*60).toFixed()}m </span>
              <span class="film-card__genre">${data.genre}</span>
            </p>
            <img src="${data.posterUrl}" class="film-card__poster" width="230" height="340" id="${data.id}">
            <p class="film-card__description">${data.fullDescription}</p>
            <span class="film-card__comments">${data.comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
          </div>
        </article>`;

export default class FilmCardView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createFilmCardTemplate(this.#data);
  }

  setEditClickHandler = (callback) => {
    this._callback.filmCardClick = callback;
    this.element.addEventListener('click', this.#filmCardClickHandler);
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmCardClick(evt);
  }
}
