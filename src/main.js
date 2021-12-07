import MainNavigationView from './view/main-navigation-view.js';
import { RenderPosition, render} from './render.js';
import ProfileTemplateView from './view/profile-view.js';
import ContetntContainerView from './view/content-view.js';
import SortTemplateView from './view/sort-view.js';
import TopRatedListView from './view/top-rated-container-view.js';
import MostCommentedListView from './view/most-commented-container-view.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import { data } from './mock/generate-data.js';
import { showPopup } from './utils/show-popup.js';
import { showCoversFilms } from './utils/show-covers-films.js';
import FilmCardView from './view/film-card-view.js';
import {siteMainElement} from './utils/show-popup.js';

const siteHeader = document.querySelector('.header');
render(siteHeader, new ProfileTemplateView(), RenderPosition.BEFOREEND);


render(siteMainElement, new MainNavigationView(), RenderPosition.AFTERBEGIN);

render(siteMainElement, new SortTemplateView(), RenderPosition.BEFOREEND);

const contentContainer = new ContetntContainerView();
render(siteMainElement, contentContainer, RenderPosition.BEFOREEND);

const filmsContainerList = contentContainer.element.querySelector('.films-list__container');
const showMoreButton = contentContainer.element.querySelector('.films-list');
showCoversFilms(filmsContainerList, data, showMoreButton);

contentContainer.element.addEventListener('click', showPopup);

if ( data.length > 0) {

  const EXTRA_FILMS_COUNT = 2;

  render(contentContainer, new TopRatedListView(), RenderPosition.BEFOREEND);
  const filmsExtraTopRated = contentContainer.element.querySelector('.films-list--extra');
  const filmsTopRatedContainers = filmsExtraTopRated.querySelector('.films-list__container');

  const topRateFilms = data.slice();

  topRateFilms.sort((a, b) => b.rating - a.rating );
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(filmsTopRatedContainers, new FilmCardView(topRateFilms[i]), RenderPosition.BEFOREEND);
  }

  render(contentContainer, new MostCommentedListView(), RenderPosition.BEFOREEND);

  const filmsExtraMostCommented = contentContainer.element.querySelectorAll('.films-list--extra');
  const filmsMostCommented = filmsExtraMostCommented[1].querySelector('.films-list__container');

  const mostCommentFilms = data.slice();
  mostCommentFilms.sort((a, b) => b.comments.length - a.comments.length );
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(filmsMostCommented, new FilmCardView(mostCommentFilms[i]), RenderPosition.BEFOREEND);
  }
}
const footerStatistic = document.querySelector('.footer__statistics');
render(footerStatistic, new FooterStatisticView(), RenderPosition.BEFOREEND);


