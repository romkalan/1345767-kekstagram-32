import {isEscapeKey} from './util.js';
import {renderComments} from './createCommentList.js';

const fullScreenWindow = document.querySelector('.big-picture');
const loadMoreButton = document.querySelector('.social__comments-loader');
const commentsShownCount = fullScreenWindow.querySelector('.social__comment-shown-count');
const commentsTotalCount = fullScreenWindow.querySelector('.social__comment-total-count');
const closeButton = document.querySelector('.big-picture__cancel');

let getComments;
const COMMENTS_PER_PORTION = 5;

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
  loadMoreButton.removeEventListener('click', getComments);
}

const getCommentsFromData = (commentsData) => {
  const commentsStartCount = 0;
  let commentsEndCount = commentsStartCount + COMMENTS_PER_PORTION;

  return function () {
    if (commentsEndCount >= commentsData.length) {
      commentsEndCount = commentsData.length;
      loadMoreButton.classList.add('hidden');
    } else {
      loadMoreButton.classList.remove('hidden');
    }

    const commentsViewed = commentsData.slice(commentsStartCount, commentsEndCount);
    renderComments(commentsViewed);
    commentsShownCount.textContent = commentsEndCount;

    commentsEndCount += COMMENTS_PER_PORTION;
  };
};

const loadDataForFullScreen = (picture) => {
  fullScreenWindow.querySelector('img').src = picture.url;
  fullScreenWindow.querySelector('.likes-count').textContent = picture.likes;
  commentsTotalCount.textContent = String(picture.comments.length);
  fullScreenWindow.querySelector('.social__caption').textContent = picture.description;

  getComments = getCommentsFromData(picture.comments);
  getComments();
  loadMoreButton.addEventListener('click', getComments);
};

const openFullScreenPicture = (pictures, index) => {
  loadDataForFullScreen(pictures[index]);
  fullScreenWindow.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const openFullScreen = (pictures, data) => {
  pictures.forEach((picture, index) => picture.addEventListener('click', () => openFullScreenPicture(data, index)));
};

closeButton.addEventListener('click', closePicture);

export {openFullScreen, closePicture};
