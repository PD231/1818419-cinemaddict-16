import { RenderPosition, render} from './render.js';
import ProfileTemplateView from './view/profile-view.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import FilmsModel from './model/movie-model.js';

import { data } from './mock/generate-data.js';

import FilmPresenter from './presenter/films-presenter.js';

const filmsModel = new FilmsModel();
filmsModel.films = data;
const siteMainElement = document.querySelector('.main');

const filmPresentor = new FilmPresenter(siteMainElement, filmsModel);
const siteHeader = document.querySelector('.header');
render(siteHeader, new ProfileTemplateView(), RenderPosition.BEFOREEND);

filmPresentor.init();

const footerStatistic = document.querySelector('.footer__statistics');

render(footerStatistic, new FooterStatisticView(), RenderPosition.AFTERBEGIN);
