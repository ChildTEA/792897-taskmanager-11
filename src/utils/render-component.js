const positionToRenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = positionToRenderPosition.BEFOREEND) => {
  switch (place) {
    case positionToRenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case positionToRenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {positionToRenderPosition, createElement, render};
