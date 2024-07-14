import {getRandomInteger, getRandomArrayElement, checkUniqValues} from './util.js';

const names = [
  'Ivan Fedorov',
  'Frank Sinatra',
  'Vladimir Valdo',
  'Kent Suwert',
  'Boris Eltsin',
  'Joe Trump',
];

const descriptions = [
  'Сомнительно, но оукэй',
  'Ты же наш, почему такой выродок?',
  'Я реально прихерел',
  'Простите меня грешника',
  'Попробую объяснить',
  'Ну сколько можно?',
  'Мне похер, я так вижу',
  'Какое-то величие, какая-то херня',
  'Все мы виноваты в этом пиздеце',
  'Я это не понимаю, мне это не интересно',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const uniqValuesTo999999 = [];
const uniqValuesTo25 = [];
const picturesCount = 25;

const createComment = () => {
  const id = checkUniqValues(0, 999999, uniqValuesTo999999);

  return {
    id,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names),
  };
};

const createCommentsArray = () => Array.from({length: getRandomInteger(0, 30)}, createComment);

const createPhotoDesription = () => {
  const id = checkUniqValues(1, 25, uniqValuesTo25);

  return {
    id,
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(15, 200),
    comments: createCommentsArray(),
  };
};

const getPictures = () => Array.from({length: picturesCount}, createPhotoDesription);

export {getPictures};
