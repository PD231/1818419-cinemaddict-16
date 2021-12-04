import { RenderPosition, render} from '../render.js';
import FilmCardView from '../view/film-card-view.js';
import EmptyFilmView from '../view/film-list-empty.js';

export const showCoversFilms = (container, data) => {
  const addFilmsCover = document.querySelector('.films-list__show-more');
  if (data.length > 0) {
    let startFilm = 0;
    let finishFilm = 5;
    const addedPartFilmsCount = 5;
    const copyData = data.slice();
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
  } else {
    render(container, new EmptyFilmView().element, RenderPosition.BEFOREEND);
    addFilmsCover.classList.add('visually-hidden');

  }
};
