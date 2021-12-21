import AbstractView from './abstract-view.js';

const createShowMoreButton = () => (
  `<button class="films-list__show-more">
      Show more
      </button>`
);

export default class ShowMoreeButtonView extends AbstractView {
  get template() {
    return createShowMoreButton();
  }

  findButton(value) {
    value.querySelector('.films-list__show-more');
  }
}
