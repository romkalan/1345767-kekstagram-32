// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
// если строка меньше или равна указанной длине, и false, если строка длиннее.
// Эта функция нам пригодится для валидации формы. Примеры использования функции:

// Проверка длины строки
function checkLineLength(sentance, value) {
  return sentance.length <= value;
}
checkLineLength('hello', 20);
// console.log(checkLineLength('hello', 20));


// Проверка строки на полиндром
function isPolindrom(sentance) {
  let reverseSentance = '';
  for (let i = sentance.length; i > 0; i--) {
    reverseSentance += sentance[i - 1];
  }
  return sentance.toUpperCase() === reverseSentance.toUpperCase();
}

isPolindrom('Otto');
// console.log(isPolindrom('word'));
// console.log(isPolindrom('aL la'));

// Вытащить только цифры из строки
function getNumberFrom(string) {
  string = string.replaceAll(' ', '');
  let number = '';
  for (let i = 0; i < string.length; i++) {
    const value = Number(string[i]);
    if (Number.isNaN(value)) {
      continue;
    }
    number += value;
  }
  return number;
}

getNumberFrom('2024 year');

// console.log(getNumberFrom('990000342 выраиывро 1111'));


// Функции для работы со временем

const dayStartTime = '05:55';
const dayEndTime = '17:45';
const meetingStartTime = '12:15';
const meetingDuration = '120';

function splitTime(time) {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}

const checkTimeMeeting = (dayStart, dayEnd, meetingStart, meetingDurationTime) => {
  const startTime = splitTime(dayStartTime);
  const endTime = splitTime(dayEndTime);
  const startMeeting = splitTime(meetingStartTime);
  const meetingTime = startMeeting + Number(meetingDurationTime);

  return (startTime <= startMeeting) && (meetingTime <= endTime);
};

checkTimeMeeting(dayStartTime, dayEndTime, meetingStartTime, meetingDuration);

// console.log(checkTimeMeeting(dayStartTime, dayEndTime, meetingStartTime, meetingDuration));
