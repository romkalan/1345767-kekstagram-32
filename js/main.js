import {renderPictures, getRandomPicturesArray, compareLikesCount} from './renderPictures.js';
import {openFullScreen} from './renderFullScreenPicture.js';
import {openImageLoader, submitPicture, formIsSubmit} from './openImageUploader.js';
import {increaseScaleImage, decreaseScaleImage} from './scaleControl.js';
import {getData} from './api.js';
import {showAlertMessage} from './showAlert.js';
import {addSlider} from './uploadEffects.js';
import {showDefaultPictureList, showRandomPictureList, showTopPictureList} from './imageListFilters.js';
import {debounce} from './util.js';

let pictures;
const RENDER_DELAY = 300;

getData()
  .then((picturesLoaded) => {
    pictures = picturesLoaded;
    renderPictures(picturesLoaded);
    const pictureList = document.querySelectorAll('.picture');
    openFullScreen(pictureList, picturesLoaded);
  })
  .catch(() => {
    showAlertMessage();
  });

showDefaultPictureList(debounce(() => renderPictures(pictures), RENDER_DELAY));
showRandomPictureList(debounce(() => renderPictures(getRandomPicturesArray(pictures)), RENDER_DELAY));
showTopPictureList(debounce(() => renderPictures(pictures.slice().sort(compareLikesCount)), RENDER_DELAY));

openImageLoader();

increaseScaleImage();
decreaseScaleImage();
addSlider();

submitPicture(formIsSubmit);
