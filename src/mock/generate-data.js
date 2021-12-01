
import {getRandomPositiveInteger, getRandomPositiveFloat} from '../utils/get-random-positive-number.js';
import { getRandomDate } from './generate-dates.js';
import { getRandomItemsFromArray } from './get-random-items-from-array.js';
import { generateComments,COMMENTS_TEXT, COMMENTS_EMOTION, NAMES_AUTOR_COMMENT} from './generate-comments.js';
const FILMS_NAME = [
  'Code Red',
  'Code Blue',
  'Code Black',
  'Code Pink',
  'Code Yellow',
  'Code Brown'
];

const ORGINAL_FILMS_NAME = [
  ' Red',
  ' Blue',
  ' Black',
  ' Pink',
  ' Yellow',
  ' Brown'
];

const FILMS_DIRECTOR = [
  'Steven',
  'John',
  'Travolta',
  'Legalas',
  'Stetham',
  'Lali-la-lay'
];

const FILMS_SCENARIST = [
  'Датч Ван дер Линде',
  'Артур Морган',
  'Джон Марстон',
  'Эбигейл Робертс',
  'Джек Марстон',
  'Хозия Мэттьюз',
];

const FILMS_ACTORS = [
  'Сьюзан Гримшо',
  'Молли О’Ши',
  'Карен Джонс',
  'Мэри-Бет Гаскилл',
  'Тилли Джексон',
  'Леопольд Штраус',
];

const FILMS_COUNTRY = [
  'Russia',
  'Italy',
  'Spain',
  'Romania',
  'THE USA',
  'England',
];

const FILMS_GENER = [
  'action',
  'cartoon',
  'comedy',
  'adventure',
  'musical',
  'opera',
];

const FILM_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const DATA_COUNT = 22;

const generateData = (filmsName, originalName, filmsDirector, filmsScenerast, filmsCountry, filmsGener) => {


  const filmCardList = [];

  for (let i = 0; i < DATA_COUNT; i++) {
    const filmsCardItem = {
      id: i+1,
      posterUrl: './images/posters/the-dance-of-life.jpg',
      filmName: filmsName[getRandomPositiveInteger(0, 5)],
      originalFilmName: originalName[getRandomPositiveInteger(0, 5)],
      rating: getRandomPositiveFloat(0, 10),
      filmDirector: filmsDirector[getRandomPositiveInteger(0, 5)],
      scenarist: filmsScenerast[getRandomPositiveInteger(0, 5)],
      reliseDate: getRandomDate(),
      runtime: getRandomPositiveInteger(0, 200),
      country: filmsCountry[getRandomPositiveInteger(0, 5)],
      genre: getRandomItemsFromArray(filmsGener, 1, 3),
      ageRating: getRandomPositiveInteger(0, 21),
      comments: getRandomItemsFromArray((generateComments(COMMENTS_TEXT, COMMENTS_EMOTION, NAMES_AUTOR_COMMENT)), 1, 5),
      fullDescription: getRandomItemsFromArray(FILM_DESCRIPTIONS, 1, 5),
      actors: getRandomItemsFromArray(FILMS_ACTORS, 2, 5),
    };

    filmCardList[i] = filmsCardItem;
  }
  return filmCardList;
};

const data = generateData(FILMS_NAME, ORGINAL_FILMS_NAME, FILMS_DIRECTOR, FILMS_SCENARIST, FILMS_COUNTRY, FILMS_GENER);
export {data};
