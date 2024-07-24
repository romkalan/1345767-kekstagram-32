const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const createComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const createCommentsFragment = (comments) => {
  const similarListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    similarListFragment.appendChild(commentElement);
  });
  return similarListFragment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  commentList.appendChild(createCommentsFragment(comments));
};

export {renderComments};
