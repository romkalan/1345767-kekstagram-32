import {isEscapeKey} from './util.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');

const onDocumentKeydown = (evt) => {
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

const replaceImage = () => {
  const imagePreview = document.querySelector('.img-upload__preview')
    .querySelector('img');
  imagePreview.src = imageUploadInput.value;
};

const openImageLoader = () => {
  imageUploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', closeUploader);
    replaceImage();
  });
};

const submitPicture = () => {
  submitButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
};

export {openImageLoader, submitPicture};
