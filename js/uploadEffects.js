const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectLevel = sliderWrapper.querySelector('.effect-level__value');
const uploadPreviewImage = document.querySelector('.img-upload__preview');
const previewImage = uploadPreviewImage.querySelector('img');
const effectSlider = sliderWrapper.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');

const addSlider = () => {
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const controlSlider = (withFilterStyle) => {
  effectSlider.noUiSlider.on('update', () => {
    effectLevel.value = effectSlider.noUiSlider.get();
    switch (withFilterStyle) {
      case 'invert':
        previewImage.style.filter = `${withFilterStyle}(${effectLevel.value}%)`;
        break;
      case 'blur':
        previewImage.style.filter = `${withFilterStyle}(${effectLevel.value}px)`;
        break;
      default:
        previewImage.style.filter = `${withFilterStyle}(${effectLevel.value})`;
        break;
    }
  });
};

const updateSliderOptions = (min, max, step) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: min,
    step: step,
  });
};

const changeEffectWith = (inputElement, min, max, step, style) => {
  inputElement.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      sliderWrapper.classList.remove('hidden');
      updateSliderOptions(min, max, step);
      controlSlider(style);
    }
  });
};

const removeEffects = () => {
  effectNone.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      sliderWrapper.classList.add('hidden');
      previewImage.style.filter = '';
    }
  });
};

const removeFilters = () => {
  sliderWrapper.classList.add('hidden');
  previewImage.style.filter = '';
  effectNone.checked = true;
};

const switchSliderEffects = () => {
  sliderWrapper.classList.add('hidden');
  changeEffectWith(effectChrome, 0, 1, 0.1, 'grayscale');
  changeEffectWith(effectSepia, 0, 1, 0.1, 'sepia');
  changeEffectWith(effectMarvin, 0, 100, 1, 'invert');
  changeEffectWith(effectPhobos, 0, 3, 0.1, 'blur');
  changeEffectWith(effectHeat, 0, 3, 0.1, 'brightness');
  removeEffects();
};

export {addSlider, switchSliderEffects, removeFilters};
