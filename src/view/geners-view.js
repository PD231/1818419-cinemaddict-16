import AbstractView from './abstract-view.js';


const createGeners = (data) => `<span class="film-details__genre">${data}</span>`;

export default class GenersView extends AbstractView {

  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }


  get template() {
    return createGeners(this.#data);
  }
}
