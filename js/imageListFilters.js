const imageFilters = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

imageFilters.classList.remove('img-filters--inactive');

const showDefaultPictureList = (callback) => {
  filterDefaultButton.addEventListener('click', () => {
    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    callback();
  });
};

const showRandomPictureList = (callback) => {
  filterRandomButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    callback();
  });
};

const showTopPictureList = (callback) => {
  filterDiscussedButton.addEventListener('click', () => {
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
    callback();
  });
};

export {showDefaultPictureList, showRandomPictureList, showTopPictureList};
