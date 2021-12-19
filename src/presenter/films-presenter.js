import {RenderPosition, render, replace} from '../render.js';

import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import ContentContainerView from '../view/content-view.js';
import TopRatedListView from '../view/top-rated-container-view.js';
import MostCommentedListView from '../view/most-commented-container-view.js';
import EmptyFilmView from '../view/film-list-empty.js';
import SortTemplateView from '../view/sort-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import GenersView from '../view/geners-view.js';
import CommentsContainerView from '../view/comments-container-view.js';
import ShowCommentsView from '../view/show-comments-view.js';

export default class FilmPresenter {
  #filmContainer = null;

  #contentContainerComponent = new ContentContainerView();
  #mainNavigationComponent = new MainNavigationView();
  #sortListComponent = new SortTemplateView();
  #topRatedListComponent = new TopRatedListView();
  #mostCommentsListComponent = new MostCommentedListView();
  #emptyFilms = new EmptyFilmView();

  #contentFilmsComponentMap = new Map();
  #topRatedFilmsComponentMap = new Map();
  #mostCommentsListComponentMap = new Map();
  #popupComponentMap = new Map();

  constructor(filmContainer) {
    this.#filmContainer = filmContainer;
  }

  #films = [];

  init = (films) => {
    this.#films = [...films];

    render(this.#filmContainer, this.#mainNavigationComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmContainer, this.#sortListComponent, RenderPosition.BEFOREEND);

    this.#createMainFilmsContainer();
    this.#renderTopRatedContainer();
    this.#renderMostCommentedContainer();
  }


  #createMainFilmsContainer = () => {
    const addFilmsCover = this.#contentContainerComponent.element.filmsList;
    const showMoreButton = this.#contentContainerComponent.showMoreButton;

    if (this.#films.length > 0) {
      this.#renderMainContainer();
      let startFilm = 0;
      let finishFilm = 5;
      const copyData = this.#films.slice();
      const showPartFilms = copyData.slice(startFilm, finishFilm);


      showPartFilms.forEach((film) => {
        const filmsCardComponent = this.#createFilmCardComponent(film);
        this.#contentFilmsComponentMap.set(film.id, filmsCardComponent);
        this.#renderFilmsCardInMainContainer(filmsCardComponent);
      });

      this.#contentContainerComponent.setShowMoreButtonClickHandler(() => {
        const addedPartFilmsCount = 5;

        startFilm += addedPartFilmsCount;
        finishFilm += addedPartFilmsCount;
        const addedPartFilms = copyData.slice(startFilm, finishFilm);

        if (finishFilm >= copyData.length) {
          showMoreButton.removeChild(addFilmsCover);
        }

        addedPartFilms.forEach((film) => {
          const filmsCardComponent = this.#createFilmCardComponent(film);
          this.#contentFilmsComponentMap.set(film.id, filmsCardComponent);
          this.#renderFilmsCardInMainContainer(filmsCardComponent);
        });
      });


    } else {
      this.#renderMessageWithoutFilms();
      showMoreButton.removeChild(addFilmsCover);
    }
  };

  #renderMainContainer = () => {
    render(this.#filmContainer, this.#contentContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderMessageWithoutFilms = () => {
    render(this.#filmContainer, this.#emptyFilms, RenderPosition.BEFOREEND);
  }

  #createFilmCardComponent = (item) => {
    const filmCardView = new FilmCardView(item);

    filmCardView.setAddedToWatchClickHandler(() => this.#handleAddedToWatch(item));
    filmCardView.setMarkedAsWatchedClickHandler(() => this.#handleAddedAsWatched(item));
    filmCardView.setMarkedAsFavoriteClickHandler(() => this.#handleAsFavorite(item));

    filmCardView.setPopupClickHandler(() => this.#showPopup(item));
    return filmCardView;
  }

  #updateFilm = (updatedFilm) => {
    const filmIndex = this.#films.findIndex((item) => item.id === updatedFilm.id);
    const filmsList = this.#films.slice();

    filmsList[filmIndex] = updatedFilm;

    this.#films = filmsList;

    const contentFilmComponent = this.#contentFilmsComponentMap.get(updatedFilm.id);

    if (contentFilmComponent) {
      const newContentFilmComponent = this.#createFilmCardComponent(updatedFilm);
      replace(contentFilmComponent, newContentFilmComponent);
      this.#contentFilmsComponentMap.set(updatedFilm.id, newContentFilmComponent);
    }
  }

  #handleAddedToWatch = (film) => {
    this.#updateFilm({...film, isAddedToWatchList: !film.isAddedToWatchList});
  }

  #handleAddedAsWatched = (film) => {
    this.#updateFilm({...film, isMarkedAsWatched: !film.isMarkedAsWatched});
  }

  #handleAsFavorite = (film) => {
    this.#updateFilm({...film, isFavorit: !film.isFavorit});
  }

  #renderFilmsCardInMainContainer = (filmCardComponent) => {
    render(this.#contentContainerComponent.filmContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

  #showPopup = (film) => {
    this.#renderPopup(film);
  };

  #updateFilmPopup = (updatedFilm) => {
    this.#updateFilm(updatedFilm);
    this.#showPopup(updatedFilm);
    this.#contentFilmsComponentMap.set(updatedFilm.newPopupComponent); // записываем в мапу новое значение
  }

  #renderPopup = (film) => {
    if (this.popupContainer) {
      this.popupContainer.element.remove();
      this.popupContainer.removeElement();
      this.popupContainer = null;
    }
    this.popupContainer = new PopupView(film);

    render(this.#filmContainer, this.popupContainer, RenderPosition.BEFOREEND);
    this.#renderGeners(film);
    this.#renderCommentsContainer(film);
    this.#addPopupEvents();

    this.popupContainer.setAddedToWatchClickHandler(() => this.#handleAddedToWatchPopup(film));
    this.popupContainer.setMarkedAsWatchedClickHandler(() => this.#handleAddedAsWatchedPopup(film));
    this.popupContainer.setMarkedAsFavoriteClickHandler(() => this.#handleAsFavoritePopup(film));

    return this.popupContainer;
  }

  #handleAddedToWatchPopup = (film) => {
    this.#updateFilmPopup({...film, isAddedToWatchList: !film.isAddedToWatchList});
  }

  #handleAddedAsWatchedPopup = (film) => {
    this.#updateFilmPopup({...film, isMarkedAsWatched: !film.isMarkedAsWatched});
  }

  #handleAsFavoritePopup = (film) => {
    this.#updateFilmPopup({...film, isFavorit: !film.isFavorit});
  }

  #renderGeners = (film) => {
    for (const genre of film.genre) {
      this.genersData = new GenersView(genre);
      render(this.popupContainer.filmDetailsRow, this.genersData, RenderPosition.BEFOREEND);
    }
  }

  #renderCommentsContainer = (film) => {
    const formContainer = this.popupContainer.filmDetailsInner;
    this.commentsContainer = new CommentsContainerView(film.comments.length);
    render(formContainer, this.commentsContainer, RenderPosition.BEFOREEND);
    this.#renderComments(film);
  }

  #renderComments = (film) => {
    const commentsList = this.popupContainer.filmDetailCommentsFilm;
    for (const comment of film.comments) {
      this.commentsData = new ShowCommentsView(comment);
      render(commentsList, this.commentsData, RenderPosition.BEFOREEND);
    }
  }

  #addPopupEvents = () => {
    document.addEventListener('keydown', this.#closePopup);
    this.popupContainer.setcloseButtonClickHandler(this.#closePopup);
  }

  #closePopup = (evt) => {
    this.#filmContainer.removeChild(this.popupContainer.element);

    if ((evt.key === 'Escape' || evt.key === 'Esc') && (this.#filmContainer.contains(this.popupContainer.element))) {
      evt.preventDefault();
      this.#filmContainer.removeChild(this.popupContainer.element);
    }
    document.removeEventListener('keydown', this.#closePopup);
  }

  #renderTopRatedContainer = () => {
    render(this.#contentContainerComponent, this.#topRatedListComponent, RenderPosition.BEFOREEND);
    this.#createTopRatedFilmCards();
  }

  #createTopRatedFilmCards = () => {
    const topRateFilms = this.#films.slice();
    topRateFilms.sort((a, b) => b.rating - a.rating);

    topRateFilms.slice(0, 2).forEach((film) => {
      const filmsCardComponent = this.#createFilmCardComponent(film);
      this.#contentFilmsComponentMap.set(film.id, filmsCardComponent);
      this.#renderFilmsCardInTopRatedContainer(filmsCardComponent);
    });
  }

  #renderFilmsCardInTopRatedContainer = (filmCardComponent) => {
    render(this.#topRatedListComponent.filmContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderMostCommentedContainer = () => {
    render(this.#contentContainerComponent, this.#mostCommentsListComponent, RenderPosition.BEFOREEND);
    this.#createMostCommentedFilmCards();
  }

  #createMostCommentedFilmCards = () => {
    const mostCommentFilms = this.#films.slice();
    mostCommentFilms.sort((a, b) => b.comments.length - a.comments.length);

    mostCommentFilms.slice(0, 2).forEach((film) => {
      const filmsCardComponent = this.#createFilmCardComponent(film);
      this.#contentFilmsComponentMap.set(film.id, filmsCardComponent);
      this.#renderFilmsCardInMostCommentedContainer(filmsCardComponent);
    });
  }

  #renderFilmsCardInMostCommentedContainer = (filmCardComponent) => {
    render(this.#mostCommentsListComponent.filmContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

}
