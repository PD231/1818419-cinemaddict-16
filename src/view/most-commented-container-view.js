import AbstractView from './abstract-view.js';

const createMostCommentedList = () => (
  `<section class="films-list films-list--extra">
<h2 class="films-list__title">Most commented</h2>

<div class="films-list__container">

</div>
</section>`
);


export default class MostCommentedListView extends AbstractView {

  get filmContainerElement() {
    return this.element.querySelector('.films-list .films-list__container');
  }

  get template() {
    return createMostCommentedList();
  }

  remove() {
    this.element.querySelector('.films-list__container').innerHTML = '';
  }
}
