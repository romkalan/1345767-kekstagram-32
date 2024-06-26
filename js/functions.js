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
function getNumberfrom (string) {
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

getNumberfrom('2024 year');

// console.log(getNumberfrom('990000342 выраиывро 1111'));
