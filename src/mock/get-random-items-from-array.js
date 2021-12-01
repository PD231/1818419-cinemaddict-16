import {getRandomPositiveInteger} from '../utils/get-random-positive-number.js';


const getRandomItemsFromArray = (randomData, minSize, maxSize) => {
  const someRandomData = [];
  for (let k = 0; k < getRandomPositiveInteger(minSize, maxSize); k++) {
    someRandomData[k] = randomData[getRandomPositiveInteger(minSize, maxSize)];
  }
  return someRandomData;
};

export {getRandomItemsFromArray};
