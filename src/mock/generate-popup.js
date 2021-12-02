import { data } from './generate-data.js';
import { RenderPosition, render} from '../render.js';
import { closePopup, siteMainElement} from '../utils/close-popup.js';
import GenersView from '../view/geners-view.js';
import PopupView from '../view/popup-view.js';
import ShowCommentsView from '../view/show-comments-view.js';
import CommentsContainerView from '../view/comments-container-view.js';

export const showPopup = (evt) => {
  if (evt.target.closest('.film-card__poster')) {
    const getFilmsId = evt.target.closest('.film-card__poster').id;
    const dataForPopup = data.find((item) => item.id === +getFilmsId);

    if (evt.target.closest('.film-card__poster')) {
      render(siteMainElement, new PopupView(dataForPopup).element, RenderPosition.BEFOREEND);
    }

    const tableWithDescriptionFilm = document.querySelector('.film-details__table').lastChild;
    const rowsCollection = tableWithDescriptionFilm.querySelectorAll('.film-details__row');
    const generRowsContainer = (rowsCollection[rowsCollection.length-1]).querySelector('.film-details__cell');

    for (let i=0; i < dataForPopup.genre.length; i++) {
      render(generRowsContainer, new GenersView(dataForPopup.genre[i]).element, RenderPosition.BEFOREEND);
    }
    const formContainer = document.querySelector('.film-details__inner');

    render(formContainer, new CommentsContainerView(dataForPopup.comments.length).element, RenderPosition.BEFOREEND);

    const commentsList = document.querySelector('.film-details__comments-list');
    for (let i=0; i < dataForPopup.comments.length; i++) {
      render(commentsList, new ShowCommentsView(dataForPopup.comments[i]).element, RenderPosition.BEFOREEND);
    }
    const closeButton = document.querySelector('.film-details__close-btn');

    closeButton.addEventListener('click', closePopup);
  }
};
