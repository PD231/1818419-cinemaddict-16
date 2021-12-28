import dayjs from 'dayjs';
import SmartView from './Smart-View';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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
    isFavorit,
    comments,
    newCommentText,
    emogiSmile,
    genre,
  } = data;

  const renderGenre = genre.map((itemGenre) => `<span class="film-details__genre">${itemGenre}</span>`).join('');

  const renderComments = comments.map((comment) => `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.commentsAutor}</span>
      <span class="film-details__comment-day">${dayjs(comment.commentsDate).format('YYYY/MM/DD HH:MM')}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
  </li>`).join('');

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
            <td class="film-details__cell">${dayjs.duration(runtime, 'm').hours()}h ${dayjs.duration(runtime, 'm').minutes()}m</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
            ${renderGenre}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description"> ${fullDescription}</p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button ${isAddedToWatchList
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist'}" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button ${isMarkedAsWatched
    ? 'film-details__control-button--active film-details__control-button--watched'
    : 'film-details__control-button--watched'}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button ${isFavorit
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite'}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>
  <div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    <ul class="film-details__comments-list">
${renderComments}
    </ul>

    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label"> ${(emogiSmile !== undefined && emogiSmile !== ' ') ? `<img src="/images/emoji/${emogiSmile}.png"
          alt="emoji" width="55" height="55" value="${emogiSmile !== undefined ? emogiSmile : ' '}">` : ' '}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentText !== undefined ? newCommentText : ''}</textarea>
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

export default class PopupView extends SmartView {

  constructor(film) {
    super();
    this._data = PopupView.parseFilmToData(film);
    this.#setInnerHandlers();
  }

  static parseFilmToData = (data) => {
    const film = { ...data, newCommentText: '', emogiSmile: ' '};
    return film;
  }

  get template() {
    return createPopup(this._data);
  }

  get filmDetailsInner() {
    return this.element.querySelector('.film-details__inner');
  }

  setCloseButtonClickHandler(callback) {
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

  setEmotionClickHandler = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#onEmogiClickHandler);
  };

  setCommentInputHandler = () => {
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  };

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

  #onEmogiClickHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      emogiSmile: evt.target.value,
    });
  }

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      newCommentText: evt.target.value,
    }, true);
  }

  #setInnerHandlers = () => {
    this.setEmotionClickHandler();
    this.setCommentInputHandler();
  }

  restoreHandlers = () => {
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addedToWatchClickHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#markedAsWatchedClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#markedAsFavoriteClickHandler);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseButton);
    this.#setInnerHandlers();
  }
}
