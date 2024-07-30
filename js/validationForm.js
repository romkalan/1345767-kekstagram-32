const imageForm = document.querySelector('#upload-select-image');
const hashtagInput = imageForm.querySelector('.text__hashtags');
const commentInput = imageForm.querySelector('.text__description');
const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => REGEXP.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagInput,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true,
);

pristine.addValidator(
  hashtagInput,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  2,
  true,
);

pristine.addValidator(
  hashtagInput,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  3,
  true,
);

pristine.addValidator(
  commentInput,
  () => commentInput.value.length <= 140,
  'Длина комментария не может быть больше 140 символов.'
);

const addValidation = () => pristine.validate();

export {addValidation};
