import {createElement} from '../render.js';

const createSortTemplate = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button--date">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--rating">Sort by rating</a></li>
</ul>`
);


export default class SortTemplateView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createSortTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
