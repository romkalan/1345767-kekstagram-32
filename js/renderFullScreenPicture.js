import {isEscapeKey} from './util.js';
import {renderComments} from './createCommentList.js';

const fullScreenWindow = document.querySelector('.big-picture');
const loadMoreButton = document.querySelector('.social__comments-loader');
const commentsShownCount = fullScreenWindow.querySelector('.social__comment-shown-count');
const commentsTotalCount = fullScreenWindow.querySelector('.social__comment-total-count');
const closeButton = document.querySelector('.big-picture__cancel');

let commentsShown = 0;
const commentsPerPortion = 5;
const commentsViewed = [];

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
  commentsShown = 0;
  commentsViewed.length = 0;
}

const increaseCommentsCount = (picture) => {
  commentsShown += commentsPerPortion;
  if (commentsShown > picture.comments.length) {
    commentsShown = picture.comments.length;
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
};

const getCommentsFromData = (commentsData, commentsCount) => {
  commentsViewed.length = 0;
  for (let i = 0; i < commentsCount; i++) {
    commentsViewed.push(commentsData[i]);
  }
};

const loadDataForFullScreen = (picture) => {
  increaseCommentsCount(picture);
  getCommentsFromData(picture.comments, commentsShown);
  renderComments(commentsViewed);
  fullScreenWindow.querySelector('img').src = picture.url;
  fullScreenWindow.querySelector('.likes-count').textContent = picture.likes;
  commentsShownCount.textContent = (picture.comments.length > commentsShown)
    ? commentsShown
    : picture.comments.length;
  commentsTotalCount.textContent = picture.comments.length;
  fullScreenWindow.querySelector('.social__caption').textContent = picture.description;
};

const loadMoreComments = (picture) => {
  loadMoreButton.addEventListener('click', () => {
    increaseCommentsCount(picture);
    getCommentsFromData(picture.comments, commentsShown);
    renderComments(commentsViewed);
    commentsShownCount.textContent = (picture.comments.length > commentsShown)
      ? commentsShown
      : picture.comments.length;
  });
};

const openFullScreenPicture = (pictures, index) => {
  loadDataForFullScreen(pictures[index]);
  fullScreenWindow.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  loadMoreComments(pictures[index]);
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closePicture);
};

const openFullScreen = (pictures, data) => {
  pictures.forEach((picture, index) => picture.addEventListener('click', () => openFullScreenPicture(data, index)));
};

export {openFullScreen};
