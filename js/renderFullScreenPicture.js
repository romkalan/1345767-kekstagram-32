const fullScreenWindow = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentList = document.querySelectorAll('.social__comment');

const hideCommentsCount = () => {
  fullScreenWindow.querySelector('.social__comment-count').classList.add('hidden');
  fullScreenWindow.querySelector('.comments-loader').classList.add('hidden');
};

const renderComments = (commentsArray) => commentList.forEach((comment, index) => {
  comment.querySelector('img').src = commentsArray[index].avatar;
  comment.querySelector('p').textContent = commentsArray[index].message;
});

const loadDataForFullScreen = (picture, index) => {
  fullScreenWindow.querySelector('img').src = picture.url;
  fullScreenWindow.querySelector('.likes-count').textContent = picture.likes;
  fullScreenWindow.querySelector('.social__comment-shown-count').textContent = 2;
  fullScreenWindow.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  fullScreenWindow.querySelector('.social__caption').textContent = picture.description;
  renderComments(picture.comments, index);
};

const openFullScreenPicture = (data, index) => {
  loadDataForFullScreen(data[index], index);
  hideCommentsCount();
  fullScreenWindow.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  closeButton.addEventListener('click', () => {
    fullScreenWindow.classList.add('hidden');
  });
};

const openFullScreen = (pictures, data) => {
  pictures.forEach((picture, index) => picture.addEventListener('click', () => openFullScreenPicture(data, index)));
};

export {openFullScreen};
