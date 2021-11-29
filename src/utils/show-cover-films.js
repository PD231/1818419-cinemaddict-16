import { RenderPosition, renderTemplate} from '../render.js';
import { createFilmCardTemplate } from '../view/film-card-view.js';


export const showCoverFilms = (data) => {
  const filmsContainerList = document.querySelector('.films-list__container');

  let startFilm = 0;
  let finishFilm = 5;
  const addedPartFilmsCount = 5;
  const copyData = data.slice();
  const addFilmsCover = document.querySelector('.films-list__show-more');
  const showPartFilms = copyData.slice(startFilm, finishFilm);

  for (let i = 0; i < showPartFilms.length; i++) {
    renderTemplate(filmsContainerList, createFilmCardTemplate(showPartFilms[i]), RenderPosition.BEFOREEND);
  }
  addFilmsCover.addEventListener('click', () => {
    startFilm += addedPartFilmsCount;
    finishFilm += addedPartFilmsCount;
    const addedPartFilms = copyData.slice(startFilm, finishFilm);
    if(finishFilm >= copyData.length) {
      addFilmsCover.classList.add('visually-hidden');
    }
    for (let i = 0; i < addedPartFilms.length; i++) {
      renderTemplate(filmsContainerList, createFilmCardTemplate(addedPartFilms[i]), RenderPosition.BEFOREEND);
    }
  });
};
