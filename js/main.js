import {renderPictures} from './renderPictures.js';
import {openFullScreen} from './renderFullScreenPicture.js';
import {openImageLoader, submitPicture, formIsSubmit} from './uploadImage.js';
import {increaseScaleImage, decreaseScaleImage} from './scaleControl.js';
import {getData} from './api.js';
import {showAlertMessage} from './showAlert.js';
import {addSlider} from './uploadEffects.js';

getData()
  .then((picturesLoaded) => {
    renderPictures(picturesLoaded);
    const pictureList = document.querySelectorAll('.picture');
    openFullScreen(pictureList, picturesLoaded);
  })
  .catch(() => {
    showAlertMessage();
  });

addSlider();
openImageLoader();
submitPicture(formIsSubmit);

increaseScaleImage();
decreaseScaleImage();
