// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random


const getRandomPositiveInteger = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return result.toFixed(2);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
// Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
// реализуем поддержку передачи минимального и максимального значения в любом порядке,
// а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

// После нам нужно убедиться, что пользователь не передал дробные значения,
// для этого на всякий пожарный случай нижнюю границу диапазона
// мы округляем к ближайшему большему целому с помощью Math.ceil,
// а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor

// Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
// мы не ругаем пользователя за переданное отрицательное число,
// а просто берём его по модулю с помощью Math.abs

// Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
// которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
// После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
// "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

// И в конце с помощью метода Math.floor мы округляем полученный результат,
// потому что Math.random() генерирует только дробные числа и ноль.


export {getRandomPositiveInteger, getRandomInteger, getRandomPositiveFloat};
