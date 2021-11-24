import { createProfileTemplate } from './view/profile-view.js';
import { createMainNavigationTemplate } from './view/main-navigation-view.js';
import { renderPosition, renderTemplate} from './render.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { creeateContetntContainerTemplate } from './view/content-view.js';
import { createShowMoreButton } from './view/show-more-button-view.js';
import {createFooterStatisticTemplate} from './view/footer-statistic-view.js';

const siteHeader = document.querySelector('.header');
renderTemplate(siteHeader, createProfileTemplate(), renderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, createMainNavigationTemplate(), renderPosition.AFTERBEGIN);

renderTemplate(siteMainElement, createSortTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, creeateContetntContainerTemplate(), renderPosition.BEFOREEND);

const filmsContainer = siteMainElement.querySelector('.films-list');
const filmsContainerList = filmsContainer.querySelector('.films-list__container');
const FILMS_COUNT = 5;

for (let i = 0; i<FILMS_COUNT; i++) {
  renderTemplate(filmsContainerList, createFilmCardTemplate(), renderPosition.BEFOREEND);
}

renderTemplate(filmsContainer, createShowMoreButton(), renderPosition.BEFOREEND);

const footerStatistic = document.querySelector('.footer__statistics');
renderTemplate(footerStatistic, createFooterStatisticTemplate(), renderPosition.BEFOREEND);
