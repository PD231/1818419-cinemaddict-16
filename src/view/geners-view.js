import { createElement } from '../render.js';


const createGeners = (data) => `<span class="film-details__genre">${data}</span>`;

export default class GenersView {
  #element = null;
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createGeners(this.#data);
  }

  removeElement() {
    this.#element = null;
  }
}
