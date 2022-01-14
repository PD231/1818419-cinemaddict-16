import {RenderPosition, render, replace} from '../render.js';

import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import ContentContainerView from '../view/content-view.js';
import TopRatedListView from '../view/top-rated-container-view.js';
import MostCommentedListView from '../view/most-commented-container-view.js';
import EmptyFilmView from '../view/film-list-empty.js';
import SortTemplateView from '../view/sort-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { SortType, UserAction, UpdateType} from '../utils/const.js';

import dayjs from 'dayjs';

export default class FilmPresenter {
  #filmContainer = null;
  #filmsModel = null;

  #currentSortType = SortType.DEFAULT;

  #contentContainerComponent = new ContentContainerView();
  #mainNavigationComponent = new MainNavigationView();
  #sortListComponent = new SortTemplateView();
  #topRatedListComponent = new TopRatedListView();
  #mostCommentsListComponent = new MostCommentedListView();
  #emptyFilms = new EmptyFilmView();
  #showMoreButton = new ShowMoreButtonView();
  #contentFilmsComponentMap = new Map();

  constructor(filmContainer, filmsModel) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get film() {
    switch(this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort((a, b) => dayjs(b.reliseDate).format('YYYY') - dayjs(a.reliseDate).format('YYYY'));
      case SortType.RATING:
        return [...this.#filmsModel.films].sort((a, b) => b.rating - a.rating);
    }

    return this.#filmsModel.films;
  }


  #scroll = 0;

  init = () => {
    render(this.#filmContainer, this.#mainNavigationComponent, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#createMainFilmsContainer();
    this.#renderTopRatedContainer();
    this.#renderMostCommentedContainer();
  }


  #createMainFilmsContainer = () => {
    const addFilmsCover = this.#contentContainerComponent.filmsList;
    this.#renderShowMoreButton();
    const showMoreButton = this.#contentContainerComponent.showMoreButton;

    if (this.film.length > 0) {
      this.#renderMainContainer();
      let startFilm = 0;
      let finishFilm = 5;
      const copyData = this.film.slice();
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
          addFilmsCover.removeChild(showMoreButton);
        }

        addedPartFilms.forEach((film) => {
          const filmsCardComponent = this.#createFilmCardComponent(film);
          this.#contentFilmsComponentMap.set(film.id, filmsCardComponent);
          this.#renderFilmsCardInMainContainer(filmsCardComponent);
        });
      });


    } else {
      this.#renderMessageWithoutFilms();
      addFilmsCover.removeChild(showMoreButton);
    }
  };

  #renderShowMoreButton = () => {
    render(this.#contentContainerComponent.filmsContainer, this.#showMoreButton, RenderPosition.AFTEREND);
  }

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

  #updateFilm = (actionType, updatedFilm) => {
    const filmIndex = this.film.findIndex((item) => item.id === updatedFilm.id);

    if (filmIndex  === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    const filmsList = this.film.slice();

    filmsList[filmIndex] = updatedFilm;

    this.#filmsModel.updateFilm(actionType, updatedFilm);


    const contentFilmComponent = this.#contentFilmsComponentMap.get(updatedFilm.id);

    if (contentFilmComponent) {
      const newContentFilmComponent = this.#createFilmCardComponent(updatedFilm);
      replace(contentFilmComponent, newContentFilmComponent);
      this.#topRatedListComponent.remove();
      this.#mostCommentsListComponent.remove();
      this.#createTopRatedFilmCards(updatedFilm);
      this.#createMostCommentedFilmCards(updatedFilm);

      this.#contentFilmsComponentMap.set(updatedFilm.id, newContentFilmComponent);
    }
  }

  #handleAddedToWatch = (film) => {
    this.#updateFilm(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...film, isAddedToWatchList: !film.isAddedToWatchList});
  }

  #handleAddedAsWatched = (film) => {
    this.#updateFilm(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...film, isMarkedAsWatched: !film.isMarkedAsWatched});
  }

  #handleAsFavorite = (film) => {
    this.#updateFilm(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...film, isFavorit: !film.isFavorit});
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
  }

  #renderPopup = (film) => {
    this.#removePopup();

    this.popupContainer = new PopupView(film);

    render(this.#filmContainer, this.popupContainer, RenderPosition.BEFOREEND);
    this.popupContainer.element.scrollTop = this.#scroll;

    this.#addPopupEvents();

    this.popupContainer.setAddedToWatchClickHandler(() => this.#handleAddedToWatchPopup(film));
    this.popupContainer.setMarkedAsWatchedClickHandler(() => this.#handleAddedAsWatchedPopup(film));
    this.popupContainer.setMarkedAsFavoriteClickHandler(() => this.#handleAsFavoritePopup(film));

    return this.popupContainer;
  }

  #removePopup = () => {
    if (this.popupContainer) {
      this.#scroll = this.popupContainer.element.scrollTop;
      this.popupContainer.element.remove();
      this.popupContainer.removeElement();
      this.popupContainer = null;
    }
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

  #addPopupEvents = () => {
    document.addEventListener('keydown', this.#onClosePopupEsc);
    this.popupContainer.setCloseButtonClickHandler(this.#onClosePopupClick);
  }

  #onClosePopupClick = () => {
    this.#filmContainer.removeChild(this.popupContainer.element);
    document.removeEventListener('keydown', this.#onClosePopupEsc);
  }

  #onClosePopupEsc = (evt) => {
    if ((evt.key === 'Escape' || evt.key === 'Esc') && (this.#filmContainer.contains(this.popupContainer.element))) {
      evt.preventDefault();
      this.#filmContainer.removeChild(this.popupContainer.element);
      document.removeEventListener('keydown', this.#onClosePopupEsc);
    }
  }

  #renderTopRatedContainer = (item) => {
    render(this.#contentContainerComponent, this.#topRatedListComponent, RenderPosition.BEFOREEND);
    this.#createTopRatedFilmCards(item);
  }

  #createTopRatedFilmCards = () => {
    const topRateFilms = this.film.slice();
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
    const mostCommentFilms = this.film.slice();
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


  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#contentContainerComponent.clearFilmContainer();

    this.#createMainFilmsContainer();

  }

  #renderSort = () => {
    render(this.#filmContainer, this.#sortListComponent, RenderPosition.BEFOREEND);
    this.#sortListComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }
}
