import { data } from '../moc/generate-data.js';
import { RenderPosition, renderTemplate} from '../render.js';
import { createPopap } from '../view/popap-view.js';
import { createGeners } from '../view/geners-view.js';
import { generateCommentsContainer, showComments } from '../view/comments-view.js';
import { closePopap, siteMainElement } from '../utils/close-popap.js';


export const showPopap = (evt) => {
  if (evt.target.closest('.film-card__poster')) {
    const getFilmsId = evt.target.closest('.film-card__poster').id;
    const dataForPopap = data.find((item) => item.id === +getFilmsId);


    if (evt.target.closest('.film-card')) {
      renderTemplate(siteMainElement, createPopap(dataForPopap), RenderPosition.BEFOREEND);
    }
    const tableWithDescriptionFilm = document.querySelector('.film-details__table').lastChild;
    const rowsCpllection = tableWithDescriptionFilm.querySelectorAll('.film-details__row');
    const generRowsContainer = (rowsCpllection[rowsCpllection.length-1]).querySelector('.film-details__cell');
    for (let i=0; i < dataForPopap.genre.length; i++) {
      renderTemplate(generRowsContainer, createGeners(dataForPopap.genre[i]), RenderPosition.BEFOREEND);
    }
    const formContainer = document.querySelector('.film-details__inner');

    renderTemplate(formContainer, generateCommentsContainer(dataForPopap.comments.length), RenderPosition.BEFOREEND);

    const commentsList = document.querySelector('.film-details__comments-list');
    for (let i=0; i < dataForPopap.comments.length; i++) {
      renderTemplate(commentsList, showComments(dataForPopap.comments[i]), RenderPosition.BEFOREEND);
    }
    const closeButton = document.querySelector('.film-details__close-btn');

    closeButton.addEventListener('click', closePopap);
  }
};
