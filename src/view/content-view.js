import AbstractView from './abstract-view.js';

const creeateContetntContainerTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">

      </div>
      <button class="films-list__show-more">
      Show more
      </button>
    </section>
  </section>`
);

export default class ContentContainerView extends AbstractView {
  get template() {
    return creeateContetntContainerTemplate();
  }

  get filmContainerElement() {
    return this.element.querySelector('.films-list .films-list__container');
  }

  get showMoreButton() {
    return this.element.querySelector('.films-list__show-more');
  }

  get filmsList() {
    return this.element.querySelector('.films-list');
  }

  setEditClickHandler = (callback) => {
    this._callback.filmCardClick = callback;
    this.element.querySelector('.films-list__container').addEventListener('click', this.#filmCardClickHandler);
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmCardClick(evt);
  }

  setShowMoreButtonClickHandler = (callback) => {
    this._callback.showMoreButtonClick = callback;
    this.element.querySelector('.films-list__show-more').addEventListener('click', this.#showMoreButtonClickHandler);
  }

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showMoreButtonClick(evt);
  }
}
