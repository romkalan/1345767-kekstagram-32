const imageForm = document.querySelector('#upload-select-image');
const uploadField = document.querySelector('.img-upload__field-wrapper');
const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const submitForm = () => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      console.log('ok');
    } else {
      uploadField.classList.add('.img-upload__field-wrapper--error');
      console.log('error');
    }
  });
};

export {submitForm};
