import { data } from './generate-data.js';
import { RenderPosition, renderTemplate} from '../render.js';
import { createPopup } from '../view/popup-view.js';
import { createGeners } from '../view/geners-view.js';
import { generateCommentsContainer, showComments } from '../view/comments-view.js';
import { closePopup, siteMainElement } from '../utils/close-popup.js';


export const showPopup = (evt) => {
  if (evt.target.closest('.film-card__poster')) {
    const getFilmsId = evt.target.closest('.film-card__poster').id;
    const dataForPopup = data.find((item) => item.id === +getFilmsId);


    if (evt.target.closest('.film-card')) {
      renderTemplate(siteMainElement, createPopup(dataForPopup), RenderPosition.BEFOREEND);
    }
    const tableWithDescriptionFilm = document.querySelector('.film-details__table').lastChild;
    const rowsCpllection = tableWithDescriptionFilm.querySelectorAll('.film-details__row');
    const generRowsContainer = (rowsCpllection[rowsCpllection.length-1]).querySelector('.film-details__cell');
    for (let i=0; i < dataForPopup.genre.length; i++) {
      renderTemplate(generRowsContainer, createGeners(dataForPopup.genre[i]), RenderPosition.BEFOREEND);
    }
    const formContainer = document.querySelector('.film-details__inner');

    renderTemplate(formContainer, generateCommentsContainer(dataForPopup.comments.length), RenderPosition.BEFOREEND);

    const commentsList = document.querySelector('.film-details__comments-list');
    for (let i=0; i < dataForPopup.comments.length; i++) {
      renderTemplate(commentsList, showComments(dataForPopup.comments[i]), RenderPosition.BEFOREEND);
    }
    const closeButton = document.querySelector('.film-details__close-btn');

    closeButton.addEventListener('click', closePopup);
  }
};
