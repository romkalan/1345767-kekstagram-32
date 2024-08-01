import {renderPictures} from './renderPictures.js';
import {getData} from './api.js';
import {openFullScreen} from './renderFullScreenPicture.js';
import {showAlertMessage} from './showAlert.js';
import {getRandomArrayElement} from './util.js';

const imageFilters = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const RANDOM_PICTURE_LIST_COUNT = 10;

imageFilters.classList.remove('img-filters--inactive');

const compareLikesCount = (pictureA, pictureB) => {
  const likesACount = Number(pictureA.likes);
  const likesBCount = Number(pictureB.likes);

  return likesBCount - likesACount;
};

const showDefaultPictureList = (callback) => {
  filterDefaultButton.addEventListener('click', () => {
    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    getData()
      .then((picturesLoaded) => {
        callback();
        const pictureList = document.querySelectorAll('.picture');
        openFullScreen(pictureList, picturesLoaded);
      })
      .catch(() => {
        showAlertMessage();
      });
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

const showRandomPictureList = (callback) => {
  filterRandomButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    getData()
      .then((picturesLoaded) => {
        picturesLoaded = getRandomPicturesArray(picturesLoaded);
        callback();
        renderPictures(picturesLoaded);
        const pictureList = document.querySelectorAll('.picture');
        openFullScreen(pictureList, picturesLoaded);
      })
      .catch(() => {
        showAlertMessage();
      });
  });
};

const showTopPictureList = (callback) => {
  filterDiscussedButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
    getData()
      .then((picturesLoaded) => {
        callback();
        const pictureList = document.querySelectorAll('.picture');
        openFullScreen(pictureList, picturesLoaded);
      })
      .catch(() => {
        showAlertMessage();
      });
  });
};

export {showDefaultPictureList, showRandomPictureList, showTopPictureList, compareLikesCount, getRandomPicturesArray};
