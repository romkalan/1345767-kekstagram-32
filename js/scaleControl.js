const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const uploadPreviewImage = document.querySelector('.img-upload__preview');
const instantScale = parseInt(scaleControlInput.value, 10);
const scaleChangeStep = instantScale * 0.25;
let scaleNumber = instantScale;

const decreaseScaleImage = () => {
  scaleControlSmaller.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (scaleNumber > scaleChangeStep) {
      scaleNumber -= scaleChangeStep;
      scaleControlInput.value = `${scaleNumber}%`;
      uploadPreviewImage.style.transform = `scale(0.${scaleNumber})`;
    }
  });
};

const increaseScaleImage = () => {
  scaleControlBigger.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (scaleNumber < instantScale) {
      scaleNumber += scaleChangeStep;
      scaleControlInput.value = `${scaleNumber}%`;
      uploadPreviewImage.style.transform = scaleNumber === 100
        ? 'scale(1)'
        : `scale(0.${scaleNumber})`;
    }
  });
};

export {decreaseScaleImage, increaseScaleImage};
