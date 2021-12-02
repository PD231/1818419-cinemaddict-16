import { RenderPosition, render} from '../render.js';
import FilmCardView from '../view/film-card-view.js';

export const showCoversFilms = (container, data) => {
  let startFilm = 0;
  let finishFilm = 5;
  const addedPartFilmsCount = 5;
  const copyData = data.slice();
  const addFilmsCover = document.querySelector('.films-list__show-more');
  const showPartFilms = copyData.slice(startFilm, finishFilm);

  for (let i = 0; i < showPartFilms.length; i++) {
    render(container, new FilmCardView(showPartFilms[i]).element, RenderPosition.BEFOREEND);
  }
  addFilmsCover.addEventListener('click', () => {
    startFilm += addedPartFilmsCount;
    finishFilm += addedPartFilmsCount;
    const addedPartFilms = copyData.slice(startFilm, finishFilm);
    if(finishFilm >= copyData.length) {
      addFilmsCover.classList.add('visually-hidden');
    }
    for (let i = 0; i < addedPartFilms.length; i++) {
      render(container, new FilmCardView(addedPartFilms[i]).element, RenderPosition.BEFOREEND);
    }
  });
};
