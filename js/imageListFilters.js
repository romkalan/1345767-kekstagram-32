import {renderPictures,removeAllPictures} from './renderPictures.js';
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

const showDefaultPictureList = () => {
  filterDefaultButton.addEventListener('click', () => {
    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    removeAllPictures();
    getData()
      .then((picturesLoaded) => {
        renderPictures(picturesLoaded);
        const pictureList = document.querySelectorAll('.picture');
        openFullScreen(pictureList, picturesLoaded);
      })
      .catch(() => {
        showAlertMessage();
      });
  });
};

const showRandomPictureList = () => {
  filterRandomButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    removeAllPictures();
    getData()
      .then((picturesLoaded) => {
        const picturesArray = [];
        while (picturesArray.length < RANDOM_PICTURE_LIST_COUNT) {
          const randomPicture = getRandomArrayElement(picturesLoaded);
          if (!picturesArray.includes(randomPicture)) {
            picturesArray.push(randomPicture);
          }
        }
        renderPictures(picturesArray);
        const pictureList = document.querySelectorAll('.picture');
        openFullScreen(pictureList, picturesArray);
      })
      .catch(() => {
        showAlertMessage();
      });
  });
};

const showTopPictureList = () => {
  filterDiscussedButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
    removeAllPictures();
    getData()
      .then((picturesLoaded) => {
        const picturesArray = picturesLoaded
          .sort(compareLikesCount);
        renderPictures(picturesArray);
        const pictureList = document.querySelectorAll('.picture');
        openFullScreen(pictureList, picturesArray);
      })
      .catch(() => {
        showAlertMessage();
      });
  });
};

export {showDefaultPictureList, showRandomPictureList, showTopPictureList};
