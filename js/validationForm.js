const imageForm = document.querySelector('#upload-select-image');
const uploadFieldset = imageForm.querySelector('.img-upload__text');
const hashtagInput = imageForm.querySelector('.text__hashtags');
const commentInput = imageForm.querySelector('.text__description');
const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const regExp = /^#[a-zа-яё0-9]{1,19}$/i;

pristine.addValidator(
  hashtagInput,
  () => regExp.test(hashtagInput.value),
  'Введён невалидный хэштег.'
);

pristine.addValidator(
  commentInput,
  () => commentInput.value.length <= 140,
  'Длина комментария больше 140 символов.'
);

const isFormValid = () => {
  const isValid = pristine.validate();
  if (isValid) {
    uploadFieldset.classList.remove('img-upload__field-wrapper--error');
  } else {
    uploadFieldset.classList.add('img-upload__field-wrapper--error');
  }
};

export {isFormValid};
