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

const createComment = () => {
  const value = checkUniqValues(0, 999999, uniqValuesTo999999);

  return {
    id: value,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names),
  };
};

const createCommentsArray = () => Array.from({length: getRandomInteger(0, 30)}, createComment);

const createPhotoDesription = () => {
  const value = checkUniqValues(1, 25, uniqValuesTo25);

  return {
    id: value,
    url: `photo/${getRandomInteger(1, 25)}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(15, 200),
    comments: createCommentsArray(),
  };
};

const similarPhotoDesriptions = Array.from({length: 25}, createPhotoDesription);
