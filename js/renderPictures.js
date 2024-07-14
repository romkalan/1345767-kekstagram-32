const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = ({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const createPicturesFragment = (pictures) => {
  const similarListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    similarListFragment.appendChild(pictureElement);
  });
  return similarListFragment;
};

const renderPictures = (pictures) => {
  pictureList.appendChild(createPicturesFragment(pictures));
};

export {renderPictures};
