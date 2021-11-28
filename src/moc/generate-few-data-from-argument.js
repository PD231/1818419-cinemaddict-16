import {getRandomPositiveInteger} from '../utils/get-random-positive-integer.js';


const getFewDataFromArgument = (randomData) => {
  const someRandomData = [];
  for (let k = 0; k < getRandomPositiveInteger(0, 5); k++) {
    someRandomData[k] = randomData[getRandomPositiveInteger(0, 5)];
  }
  return someRandomData;
};

export {getFewDataFromArgument};
