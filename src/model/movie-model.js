import AbstractObservable from '../utils/abstract-observible';

export default class FilmsModel extends AbstractObservable {
  #films = [];

  set films(films) {
    this.#films = [...films];
  }

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    this._notify(updateType, update);
  }


  // addFilm = (updateType, update) => {
  //   this.#films = [
  //     update,
  //     ...this.#films,
  //   ];

  //   this._notify(updateType, update);
  // }

  // deleteCmment = (updateType, update) => {
  //   const index = this.#films.findIndex((film) => film.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t delete unexisting film');
  //   }

  //   this.#films = [
  //     ...this.#films.slice(0, index),
  //     ...this.#films.slice(index + 1),
  //   ];

  //   this._notify(updateType);
  // }
}
