const alertTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');
const ALERT_SHOW_TIME = 5000;

const createAlert = () => alertTemplate.cloneNode(true);

const showAlertMessage = () => {
  const alertMessage = createAlert();
  document.body.appendChild(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlertMessage};
