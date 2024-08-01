import {renderPictures} from './renderPictures.js';
import {openFullScreen} from './renderFullScreenPicture.js';
import {openImageLoader, submitPicture, formIsSubmit} from './uploadImage.js';
import {increaseScaleImage, decreaseScaleImage} from './scaleControl.js';
import {getData} from './api.js';
import {showAlertMessage} from './showAlert.js';
import {addSlider} from './uploadEffects.js';
import {
  compareLikesCount,
  showDefaultPictureList,
  showRandomPictureList,
  showTopPictureList,
  getRandomPicturesArray,
} from './imageListFilters.js';
import {debounce} from './util.js';

let pictures;

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

showDefaultPictureList(debounce(() => renderPictures(pictures), 300));
showRandomPictureList(() => renderPictures(getRandomPicturesArray(pictures)));
showTopPictureList(debounce(() => renderPictures(pictures.slice().sort(compareLikesCount)), 300));

openImageLoader();

increaseScaleImage();
decreaseScaleImage();
addSlider();

submitPicture(formIsSubmit);
