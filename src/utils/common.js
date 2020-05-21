import moment from "moment";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};


export {getRandomArrayItem, getRandomIntegerNumber, formatDate, formatTime, isRepeating, isOverdueDate, isOneDay};
