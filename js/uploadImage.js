import {isEscapeKey} from './util.js';
import {addValidation} from './validationForm.js';
import {switchSliderEffects, removeFilters} from './uploadEffects.js';
import {showAlertMessage} from './showAlert.js';
import {sendData} from './api.js';
import {removeScaling} from './scaleControl.js';

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

const removeEffectsFromImage = () => {
  removeFilters();
  removeScaling();
};

function closeUploader() {
  removeEffectsFromImage();
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
    switchSliderEffects();
    // replaceImage();
  });
};

const formIsSubmit = () => {
  closeUploader();
  const successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  const okButton = document.querySelector('.success__button');
  okButton.addEventListener('click', () => {
    successMessage.remove();
  });
};

const formIsNotSubmit = () => {
  closeUploader();
  const failedMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const failedMessage = failedMessageTemplate.cloneNode(true);
  document.body.appendChild(failedMessage);

  const okButton = document.querySelector('.error__button');
  okButton.addEventListener('click', () => {
    failedMessage.remove();
  });
};

const submitPicture = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = addValidation();
    if (isValid) {
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => {
          formIsNotSubmit();
        });
    }
  });
};

export {openImageLoader, submitPicture, formIsSubmit};
