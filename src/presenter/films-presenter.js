import { RenderPosition, render} from '../render.js';

import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import ContetntContainerView from '../view/content-view.js';
import TopRatedListView from '../view/top-rated-container-view.js';
import MostCommentedListView from '../view/most-commented-container-view.js';
import FooterStatisticView from '../view/footer-statistic-view.js';
import EmptyFilmView from '../view/film-list-empty.js';
import SortTemplateView from '../view/sort-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import GenersView from '../view/geners-view.js';
import CommentsContainerView from '../view/comments-container-view.js';
import ShowCommentsView from '../view/show-comments-view.js';

export default class FilmPresenter {
  #filmContainer = null;
  #changeBookmark = null;

  #contentContainerComponent = new ContetntContainerView();
  #mainNavigationComponent = new MainNavigationView();
  #sortListComponent = new SortTemplateView();
  #topRatedListComponent = new TopRatedListView();
  #mostCommentsListComponent = new MostCommentedListView();
  #footerStatisticComponent = new FooterStatisticView();
  #emptyFilms = new EmptyFilmView();

  constructor(filmContainer, changeBookmark) {
    this.#filmContainer = filmContainer;
    this.#changeBookmark = changeBookmark;
  }

  #films = [];

  init = (films) => {
    this.#films = [...films];

    render(this.#filmContainer, this.#mainNavigationComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmContainer, this.#sortListComponent, RenderPosition.BEFOREEND);

    this.#createMainFilmsContainer();
    this.#renderTopRatedContainer();
    this.#renderMostCommentedContainer();

    this.#renderFooter();
  }


  #createMainFilmsContainer = () => {
    const showMoreButton = this.#contentContainerComponent.element.querySelector('.films-list');
    const addFilmsCover = showMoreButton.querySelector('.films-list__show-more');

    if (this.#films.length > 0) {
      this.#renderMainConteiner();
      let startFilm = 0;
      let finishFilm = 5;
      const copyData = this.#films.slice();
      const showPartFilms = copyData.slice(startFilm, finishFilm);


      showPartFilms.forEach((film) => {
        this.#createFilmCardcomponent(film);
        this.#renderFilmsCardInMainContainer();
      });


      addFilmsCover.addEventListener('click', () => {
        const addedPartFilmsCount = 5;

        startFilm += addedPartFilmsCount;
        finishFilm += addedPartFilmsCount;
        const addedPartFilms = copyData.slice(startFilm, finishFilm);

        if(finishFilm >= copyData.length) {
          showMoreButton.removeChild(addFilmsCover);
        }

        addedPartFilms.forEach((film) => {
          this.#createFilmCardcomponent(film);
          this.#renderFilmsCardInMainContainer();
        });

      });

    } else {
      this.#renderMessageWithoutFilms();
      showMoreButton.removeChild(addFilmsCover);
    }
  };

  #renderMainConteiner = () => {
    render(this.#filmContainer, this.#contentContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderMessageWithoutFilms = () => {
    render(this.#filmContainer,  this.#emptyFilms, RenderPosition.BEFOREEND);
  }

  #createFilmCardcomponent = (item) => {
    this.filmCardComponent = new FilmCardView(item);

    this.filmCardComponent.setAddedToWatchClickHandler(this.#handleAddedToWatch);
    this.filmCardComponent.setMarkedAsWatchedClickHandler(this.#handleAddedAsWatched);
    this.filmCardComponent.setMarkedAsFavoriteClickHandler(this.#handleAsFAvorite);

    this.filmCardComponent.setPopupClickHandler(this.#showPopup);
  }

  #handleAddedToWatch = () => {
    this.#changeBookmark({...this.filmCardComponent, isAddedToWatchList: !this.filmCardComponent.isAddedToWatchList});
  }

  #handleAddedAsWatched = () => {
    this.#changeBookmark({...this.filmCardComponent, isMarkedAsWatched: !this.filmCardComponent.isMarkedAsWatched});
  }

  #handleAsFAvorite = () => {
    this.#changeBookmark({...this.filmCardComponent, isFavorit: !this.filmCardComponent.isFavorit});
  }

  #renderFilmsCardInMainContainer = () => {
    const filmsContainerList = this.#contentContainerComponent.element.querySelector('.films-list__container');
    render(filmsContainerList, this.filmCardComponent, RenderPosition.BEFOREEND);
  }

  #showPopup = (evt) => {
    this.#renderPopup(evt);
    this.#renderGeners(evt);
    this.#renderCommentsContainer(evt);
  };


  #renderPopup = (evt) => {
    this.popupContainer = new PopupView(this.#findDataForPopup(evt));
    if (this.#filmContainer.contains(this.#filmContainer.querySelector('.film-details'))) {
      this.#filmContainer.removeChild(this.#filmContainer.querySelector('.film-details'));
    }
    render(this.#filmContainer, this.popupContainer, RenderPosition.BEFOREEND);
    this.#addPopupEvents();
  }

  #renderGeners = (evt) => {
    const rowsCollection = this.popupContainer.element.querySelectorAll('.film-details__row');
    const generRowsContainer = (rowsCollection[rowsCollection.length-1]).querySelector('.film-details__cell');

    for (let i = 0; i < this.#findDataForPopup(evt).genre.length; i++) {
      this.genersData = new GenersView(this.#findDataForPopup(evt).genre[i]);
      render(generRowsContainer, this.genersData , RenderPosition.BEFOREEND);
    }
  }

  #renderCommentsContainer = (evt) => {
    const formContainer = this.popupContainer.element.querySelector('.film-details__inner');
    this.commentsContainer = new CommentsContainerView(this.#findDataForPopup(evt).comments.length);
    render(formContainer, this.commentsContainer, RenderPosition.BEFOREEND);
    this.#renderComments(evt);
  }

  #renderComments = (evt) => {
    const commentsList = this.popupContainer.element.querySelector('.film-details__comments-list');
    for (let i = 0; i < this.#findDataForPopup(evt).comments.length; i++) {
      this.commentsData = new ShowCommentsView(this.#findDataForPopup(evt).comments[i]);
      render(commentsList, this.commentsData, RenderPosition.BEFOREEND);
    }
  }

  #findDataForPopup = (evt) => {
    const getFilmsId = evt.target.closest('.film-card__poster').id;
    const dataForPopup = this.#films.find((item) => item.id === +getFilmsId);
    return dataForPopup;
  }

  #addPopupEvents = () => {
    const closeButton = this.popupContainer.element.querySelector('.film-details__close-btn');
    document.addEventListener('keydown', this.#closePopup);
    closeButton.addEventListener('click', this.#closePopup);
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
    render(this.#contentContainerComponent,  this.#topRatedListComponent, RenderPosition.BEFOREEND);
    this.#createTopRatedFilmCards();
  }

  #createTopRatedFilmCards = () => {
    const topRateFilms = this.#films.slice();
    topRateFilms.sort((a, b) => b.rating - a.rating );

    topRateFilms.slice(0,2).forEach((film) => {
      this.#createFilmCardcomponent(film);
      this.#renderFilmsCardInTopRatedContainer();
    });
  }

  #renderFilmsCardInTopRatedContainer = () => {
    const filmsTopRatedContainers = this.#contentContainerComponent.element.querySelector('.films-list--extra').querySelector('.films-list__container');
    render(filmsTopRatedContainers, this.filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderMostCommentedContainer = () => {
    render(this.#contentContainerComponent,  this.#mostCommentsListComponent, RenderPosition.BEFOREEND);
    this.#createMostCommentedFilmCards();
  }

  #createMostCommentedFilmCards = () => {
    const mostCommentFilms = this.#films.slice();
    mostCommentFilms.sort((a, b) => b.comments.length - a.comments.length );

    mostCommentFilms.slice(0,2).forEach((film) => {
      this.#createFilmCardcomponent(film);
      this.#renderFilmsCardInMostCommentedContainer();
    });
  }

  #renderFilmsCardInMostCommentedContainer = () => {
    const filmsMostCommentedContainers = this.#contentContainerComponent.element.querySelectorAll('.films-list--extra')[1].querySelector('.films-list__container');
    render(filmsMostCommentedContainers, this.filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderFooter = () => {
    const footerStatistic = document.querySelector('.footer__statistics');
    render(footerStatistic, this.#footerStatisticComponent, RenderPosition.BEFOREEND);
  }

}
