import {isEscapeKey} from './util.js';
import {isFormValid} from './validationForm.js';
import {addSlider, switchSliderEffects} from './uploadEffects.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const imageForm = document.querySelector('#upload-select-image');

const onDocumentKeydown = (evt) => {
  if (document.querySelector('.text__hashtags') === document.activeElement
    || document.querySelector('.text__description') === document.activeElement) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploader();
  }
};

function closeUploader() {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadInput.value = '';
}

// const replaceImage = () => {
//   const imagePreview = document.querySelector('.img-upload__preview')
//     .querySelector('img');
//   imagePreview.src = imageUploadInput.value;
// };

const openImageLoader = () => {
  imageUploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', closeUploader);
    addSlider();
    switchSliderEffects();
    // replaceImage();
  });
};

const submitPicture = () => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    isFormValid();
  });
};

export {openImageLoader, submitPicture};
