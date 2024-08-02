const fileChooser = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const chooseFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

export {chooseFile};
