import MainNavigationView from './view/main-navigation-view.js';
import { RenderPosition, render} from './render.js';
import ProfileTemplateView from './view/profile-view.js';
import ContetntContainerView from './view/content-view.js';
import SortTemplateView from './view/sort-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import TopRatedListView from './view/top-rated-container-view.js';
import MostCommentedListView from './view/most-commented-container-view.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import { data } from './mock/generate-data.js';
import { showPopup } from './mock/generate-popup.js';
import { showCoversFilms } from './utils/show-covers-films.js';
import FilmCardView from './view/film-card-view.js';

const siteHeader = document.querySelector('.header');
render(siteHeader, new ProfileTemplateView().element, RenderPosition.BEFOREEND);


const siteMainElement = document.querySelector('.main');
render(siteMainElement, new MainNavigationView().element, RenderPosition.AFTERBEGIN);

render(siteMainElement, new SortTemplateView().element, RenderPosition.BEFOREEND);

const contentContainer = new ContetntContainerView();
render(siteMainElement, contentContainer.element, RenderPosition.BEFOREEND);


const filmsContainer = contentContainer.element.querySelector('.films-list');
render(filmsContainer, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);


const filmsContainerList = contentContainer.element.querySelector('.films-list__container');
showCoversFilms(filmsContainerList, data);


const EXTRA_FILMS_COUNT = 2;

render(contentContainer.element, new TopRatedListView().element, RenderPosition.BEFOREEND);
const filmsExtraTopRated = contentContainer.element.querySelector('.films-list--extra');
const filmsTopRatedContainers = filmsExtraTopRated.querySelector('.films-list__container');

const topRateFilms = data.slice();

topRateFilms.sort((a, b) => b.rating - a.rating );
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsTopRatedContainers, new FilmCardView(topRateFilms[i]).element, RenderPosition.BEFOREEND);
}


render(contentContainer.element, new MostCommentedListView().element, RenderPosition.BEFOREEND);

const filmsExtraMostCommented = contentContainer.element.querySelectorAll('.films-list--extra');
const filmsMostCommented = filmsExtraMostCommented[1].querySelector('.films-list__container');

const mostCommentFilms = data.slice();
mostCommentFilms.sort((a, b) => b.comments.length - a.comments.length );

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsMostCommented, new FilmCardView(mostCommentFilms[i]).element, RenderPosition.BEFOREEND);
}

const footerStatistic = document.querySelector('.footer__statistics');
render(footerStatistic, new FooterStatisticView().element, RenderPosition.BEFOREEND);


contentContainer.element.addEventListener('click', showPopup);
