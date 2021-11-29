import dayjs from 'dayjs';


export const generateCommentsContainer = (dataCount) => `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${dataCount}</span></h3>

    <ul class="film-details__comments-list"></ul>

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
</div>`;

export const showComments = (data) => `<li class="film-details__comment">
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