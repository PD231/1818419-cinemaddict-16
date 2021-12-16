import { RenderPosition, render} from './render.js';
import ProfileTemplateView from './view/profile-view.js';

import { data } from './mock/generate-data.js';

import FilmPresenter from './presenter/films-presenter.js';

const siteMainElement = document.querySelector('.main');

const filmPresentor = new FilmPresenter(siteMainElement);
const siteHeader = document.querySelector('.header');
render(siteHeader, new ProfileTemplateView(), RenderPosition.BEFOREEND);

filmPresentor.init(data);

