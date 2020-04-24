const positionToRenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderComponent = (container, element, place = positionToRenderPosition.BEFOREEND) => {
  switch (place) {
    case positionToRenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case positionToRenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {positionToRenderPosition, getRandomArrayItem, getRandomIntegerNumber, formatTime, createElement, renderComponent};
