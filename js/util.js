const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const checkUniqValues = (a, b, array) => {
  let value = getRandomInteger(a, b);
  while (array.includes(value)) {
    value = getRandomInteger(a, b);
  }
  array.push(value);
  return value;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, checkUniqValues, isEscapeKey};
