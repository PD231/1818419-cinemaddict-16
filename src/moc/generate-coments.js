import {getRandomPositiveInteger} from '../utils/get-random-positive-integer.js';
import { commentsDate } from './generator-dates.js';
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
  '🙂',
  '😐',
  '🙁',
  '😠',
  '😭',
];

const NAMES_AUTOR_COMMENT = [
  'Jon',
  'Lenny',
  'Jill',
  'Tommy Vercetty',
  'Vinny Jonesin',
  'William Backham',
];

const COMMENTS_COUNT = 5;

export const generateComments = (message, emotion, autor) => {
  const COMMENTS = [];

  for (let i = 0; i < COMMENTS_COUNT; i++) {
    const comment = {
      commentsText: message[getRandomPositiveInteger(1, 6)],
      emotion: emotion[getRandomPositiveInteger(1, 5)],
      commentsAutor: autor[getRandomPositiveInteger(1, 6)],
      commentsDate: commentsDate(),
    };
    COMMENTS[i] = comment;
  }
  return COMMENTS;
};


export {COMMENTS_TEXT, COMMENTS_EMOTION, NAMES_AUTOR_COMMENT};