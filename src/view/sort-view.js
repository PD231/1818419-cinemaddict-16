import AbstractView from './abstract-view.js';

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date-down',
  RATING: 'date-up',
};

const createSortTemplate = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button  sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button " data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button " data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`
);


export default class SortTemplateView extends AbstractView {

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    //evt.target.classList.add('sort__button--active');
    const filterButtons = this.element.querySelectorAll('.sort__button');

    for (let i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i] === evt.target) {
        evt.target.classList.add('sort__button--active');

      } else {
        filterButtons[i].classList.remove('sort__button--active');
      }
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
