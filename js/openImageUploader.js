import {isEscapeKey} from './util.js';
import {addValidation} from './validationForm.js';
import {switchSliderEffects, removeFilters} from './uploadEffects.js';
import {sendData} from './api.js';
import {removeScaling} from './scaleControl.js';
import {chooseFile} from './uploadImage.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const imageForm = document.querySelector('#upload-select-image');
const submitFormButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

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
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadInput.value = '';
}

const createSubmitMessage = (status) => {
  const messageTemplate = document.querySelector(`#${status}`)
    .content
    .querySelector(`.${status}`);
  const message = messageTemplate.cloneNode(true);
  document.body.appendChild(message);
};

const removeSubmitMessage = (status) => {
  const message = document.querySelector(`.${status}`);
  message.remove();
};

const openImageLoader = () => {
  imageUploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', closeUploader);
    chooseFile();
    switchSliderEffects();
  });
};

const blockSubmitButton = () => {
  submitFormButton.disabled = true;
  submitFormButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitFormButton.disabled = false;
  submitFormButton.textContent = SubmitButtonText.IDLE;
};

const formIsSubmit = () => {
  closeUploader();
  createSubmitMessage('success');
  const okButton = document.querySelector('.success__button');
  okButton.addEventListener('click', () => {
    removeSubmitMessage('success');
    removeEffectsFromImage();
  });
};

const formIsNotSubmit = () => {
  closeUploader();
  createSubmitMessage('error');
  const okButton = document.querySelector('.error__button');
  okButton.addEventListener('click', () => {
    removeSubmitMessage('error');
  });
};

const submitPicture = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = addValidation();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => {
          formIsNotSubmit();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {openImageLoader, submitPicture, formIsSubmit};
