import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';


const showComments = (data) => `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-smile">
</span>
<div>
  <p class="film-details__comment-text">${data.comment}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${data.commentsAutor}</span>
    <span class="film-details__comment-day">${dayjs(data.commentsDate).format('YYYY/MM/DD HH:MM')}</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`;

export default class ShowCommentsView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return showComments(this.#data);
  }

}
