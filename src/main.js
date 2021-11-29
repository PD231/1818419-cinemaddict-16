import { createProfileTemplate } from './view/profile-view.js';
import { createMainNavigationTemplate } from './view/main-navigation-view.js';
import { RenderPosition, renderTemplate} from './render.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { creeateContetntContainerTemplate } from './view/content-view.js';
import { createShowMoreButton } from './view/show-more-button-view.js';
import {createFooterStatisticTemplate} from './view/footer-statistic-view.js';
import { createTopRatedList } from './view/top-rated-container-view.js';
import { createMostCommentedList} from './view/most-commented-container-view.js';
import { data } from './moc/generate-data.js';
import { showPopap } from './moc/generate-comment.js';


const siteHeader = document.querySelector('.header');
renderTemplate(siteHeader, createProfileTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, createMainNavigationTemplate(), RenderPosition.AFTERBEGIN);

renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, creeateContetntContainerTemplate(), RenderPosition.BEFOREEND);

const films = siteMainElement.querySelector('.films');
const filmsContainer = siteMainElement.querySelector('.films-list');
const filmsContainerList = filmsContainer.querySelector('.films-list__container');
const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
for (let i = 0; i<FILMS_COUNT; i++) {
  renderTemplate(filmsContainerList, createFilmCardTemplate(data[i]), RenderPosition.BEFOREEND);
}

renderTemplate(filmsContainer, createShowMoreButton(), RenderPosition.BEFOREEND);

renderTemplate(films, createTopRatedList(), RenderPosition.BEFOREEND);

const filmsExtraTopRated = films.querySelector('.films-list--extra');
const filmsTopRatedContainers = filmsExtraTopRated.querySelector('.films-list__container');

const topRateFilms = data.slice();

topRateFilms.sort((a, b) => b.rating - a.rating );
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderTemplate(filmsTopRatedContainers, createFilmCardTemplate(topRateFilms[i]), RenderPosition.BEFOREEND);
}


renderTemplate(films, createMostCommentedList(), RenderPosition.BEFOREEND);

const extraLists = films.querySelectorAll('.films-list--extra');
const filmsMostCommented = extraLists[1].querySelector('.films-list__container');

const mostCommentFilms = data.slice();
mostCommentFilms.sort((a, b) => b.comments.length - a.comments.length );

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderTemplate(filmsMostCommented, createFilmCardTemplate(mostCommentFilms[i]), RenderPosition.BEFOREEND);
}
const footerStatistic = document.querySelector('.footer__statistics');
renderTemplate(footerStatistic, createFooterStatisticTemplate(), RenderPosition.BEFOREEND);


films.addEventListener('click', showPopap);

