import {createPhotoDescriptions} from './data.js';

const similarListFragment = document.createDocumentFragment();
const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictures = createPhotoDescriptions();

pictures.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  similarListFragment.appendChild(pictureElement);
});

const renderPictures = () => {
  pictureList.appendChild(similarListFragment);
};

export {renderPictures};
