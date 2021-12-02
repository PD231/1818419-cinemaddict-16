import {createElement} from '../render.js';

const createFooterStatisticTemplate = () => (
  `<p>
  130 291 movies inside
  </p>`
);

export default class FooterStatisticView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFooterStatisticTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
