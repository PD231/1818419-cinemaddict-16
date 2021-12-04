import dayjs from 'dayjs';
import {getRandomPositiveInteger, getRandomInteger} from './get-random-positive-number.js';

const getCommentsDate = () => dayjs().add(getRandomPositiveInteger(-4, 7), 'day').add(getRandomPositiveInteger(-5, 5), 'month').add(getRandomInteger(-2, 0), 'year').toISOString();
const getRandomDate = () => dayjs().add(getRandomPositiveInteger(1, 7), 'day').add(getRandomPositiveInteger(1, 12), 'month').add(getRandomInteger(-100, -1), 'year').toISOString();

export {getCommentsDate, getRandomDate};
