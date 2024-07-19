import {isEscapeKey} from './util.js';
import {renderComments} from './createCommentList.js';

const fullScreenWindow = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture() {
  fullScreenWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const loadDataForFullScreen = (picture) => {
  fullScreenWindow.querySelector('img').src = picture.url;
  fullScreenWindow.querySelector('.likes-count').textContent = picture.likes;
  fullScreenWindow.querySelector('.social__comment-shown-count').textContent = (picture.comments.length > 2) ? 2 : picture.comments.length;
  fullScreenWindow.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  fullScreenWindow.querySelector('.social__caption').textContent = picture.description;
  renderComments(picture.comments);
};

const openFullScreenPicture = (pictures, index) => {
  loadDataForFullScreen(pictures[index]);
  fullScreenWindow.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closePicture);
};

const openFullScreen = (pictures, data) => {
  pictures.forEach((picture, index) => picture.addEventListener('click', () => openFullScreenPicture(data, index)));
};

export {openFullScreen};
