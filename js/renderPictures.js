import {openFullScreen} from './renderFullScreenPicture.js';
import {getRandomArrayElement} from './util.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const RANDOM_PICTURE_LIST_COUNT = 10;

const createPicture = ({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const createPicturesFragment = (pictures) => {
  const similarListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    similarListFragment.appendChild(pictureElement);
  });
  return similarListFragment;
};

const removeAllPictures = () => {
  const pictures = pictureList.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    pictureList.removeChild(picture);
  });
};

const getRandomPicturesArray = (picturesLoaded) => {
  const picturesArray = [];
  while (picturesArray.length < RANDOM_PICTURE_LIST_COUNT) {
    const randomPicture = getRandomArrayElement(picturesLoaded);
    if (!picturesArray.includes(randomPicture)) {
      picturesArray.push(randomPicture);
    }
  }
  return picturesArray;
};

const compareLikesCount = (pictureA, pictureB) => {
  const likesACount = Number(pictureA.likes);
  const likesBCount = Number(pictureB.likes);

  return likesBCount - likesACount;
};

const renderPictures = (pictures) => {
  removeAllPictures();
  pictureList.appendChild(createPicturesFragment(pictures));
  const picturesArray = document.querySelectorAll('.picture');
  openFullScreen(picturesArray, pictures);
};

export {renderPictures, removeAllPictures, getRandomPicturesArray, compareLikesCount};
