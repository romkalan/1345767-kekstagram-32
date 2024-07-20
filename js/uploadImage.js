import {isEscapeKey} from './util.js';
import {isFormValid} from './validationForm.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const imageForm = document.querySelector('#upload-select-image');

const onDocumentKeydown = (evt) => {
  // if (document.querySelector('input') === document.activeElement) {
  //   evt.stopPropagation();
  // }
  if (isEscapeKey(evt)) {
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
