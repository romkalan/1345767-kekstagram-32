import {getPictures} from './data.js';
import {renderPictures} from './renderPictures.js';
import {openFullScreen} from './renderFullScreenPicture.js';
import {openImageLoader, submitPicture} from './uploadImage.js';
import {increaseScaleImage, decreaseScaleImage} from './scaleControl.js';

const pictures = getPictures();

renderPictures(pictures);

const pictureList = document.querySelectorAll('.picture');

openFullScreen(pictureList, pictures);

openImageLoader();
submitPicture();

increaseScaleImage();
decreaseScaleImage();
