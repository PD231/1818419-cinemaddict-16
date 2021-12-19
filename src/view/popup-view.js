import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createPopup = (data) => {
  const {
    filmName,
    fullDescription,
    rating,
    reliseDate,
    runtime,
    actors,
    scenarist,
    filmDirector,
    country,
    originalFilmName,
    ageRating,
    posterUrl,
    isAddedToWatchList,
    isMarkedAsWatched,
    isFavorit
  } = data;

  const addedToWatchList = isAddedToWatchList
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist';

  const markedAsWatched = isMarkedAsWatched
    ? 'film-details__control-button--active film-details__control-button--watched'
    : 'film-details__control-button--watched';

  const markedAsFavorite = isFavorit
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite';


  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${posterUrl}" alt="">

        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmName}</h3>
            <p class="film-details__title-original">Original: ${originalFilmName}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${filmDirector}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${scenarist}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${dayjs(reliseDate).format('DD MMMM YYYY')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${Math.trunc(runtime / 60)}h ${(((runtime/60)-Math.trunc(runtime / 60))*60).toFixed()}m</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell"></td>
          </tr>
        </table>

        <p class="film-details__film-description"> ${fullDescription}</p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button ${addedToWatchList}" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button ${markedAsWatched}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button ${markedAsFavorite}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>
</form>
</section>`;
};

export default class PopupView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createPopup(this.#data);
  }

  get filmDetailsRow() {
    const rowsCollection = this.element.querySelectorAll('.film-details__row');
    const generRowsContainer = (rowsCollection[rowsCollection.length - 1]).querySelector('.film-details__cell');
    return generRowsContainer;
  }

  get filmDetailsInner() {
    return this.element.querySelector('.film-details__inner');
  }

  get filmDetailCommentsFilm () {
    return this.element.querySelector('.film-details__comments-list');
  }

  setcloseButtonClickHandler = (callback) => {
    this._callback.closeButton = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseButton);
  }

  #popupCloseButton = (evt) => {
    evt.preventDefault();
    this._callback.closeButton(evt);
  }

  setAddedToWatchClickHandler(callback) {
    this._callback.addedToWatchClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addedToWatchClickHandler);
  }

  setMarkedAsWatchedClickHandler(callback) {
    this._callback.markedAsWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#markedAsWatchedClickHandler);
  }

  setMarkedAsFavoriteClickHandler(callback) {
    this._callback.markedAsFavoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#markedAsFavoriteClickHandler);
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
