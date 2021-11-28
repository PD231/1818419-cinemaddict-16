import dayjs from 'dayjs';
import {getRandomPositiveInteger, getRandomInteger} from '../utils/get-random-positive-integer.js';

const commentsDate = () => dayjs().add(getRandomPositiveInteger(1, 7), 'day').add(getRandomPositiveInteger(1, 12), 'month').add(getRandomInteger(-2, 0), 'year').toDate();
const randomDate = () => dayjs().add(getRandomPositiveInteger(1, 7), 'day').add(getRandomPositiveInteger(1, 12), 'month').add(getRandomInteger(-100, 0), 'year').toDate();

export {commentsDate, randomDate};