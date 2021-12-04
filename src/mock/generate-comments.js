import {getRandomPositiveInteger} from '../utils/get-random-positive-number.js';
import { getCommentsDate } from '../utils/generate-dates.js';


const COMMENTS_TEXT = [
  'Film is bullSheet',
  'normalno',
  'Could you make better?',
  'it is wanderful',
  'very important for woman',
  'why do not fast car in this movie?',
  'i do not have enough money and i wiil not watching',
];


const COMMENTS_EMOTION = [
  'smile', 'sleeping', 'puke', 'angry',
];

const NAMES_AUTOR_COMMENT = [
  'Jon',
  'Lenny',
  'Jill',
  'Tommy Vercetty',
  'Vinny Jonesin',
  'William Backham',
];

const COMMENTS_COUNT = 10;

export const generateComments = (message, emotion, autor) =>  {
  const COMMENTS = [];
  for (let i=0; i < COMMENTS_COUNT; i++) {
    const commentItem = {
      id: i,
      comment: message[getRandomPositiveInteger(0, 6)],
      emotion: emotion[getRandomPositiveInteger(0, 3)],
      commentsAutor: autor[getRandomPositiveInteger(0, 5)],
      commentsDate: getCommentsDate(),
    };
    COMMENTS[i] = commentItem;
  }
  return COMMENTS;
};


export {COMMENTS_TEXT, COMMENTS_EMOTION, NAMES_AUTOR_COMMENT};
