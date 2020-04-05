
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-editor.js";
import {createBoardTemplate} from "./components/board.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";

const TASK_COUNT = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderComponentNTimes = (container, template, count = 1, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};


renderComponent(siteHeaderElement, createSiteMenuTemplate());
renderComponent(siteMainElement, createFilterTemplate());
renderComponent(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board.container`);
const tasksContainerElement = boardElement.querySelector(`.board__tasks`);

renderComponent(boardElement, createSortingTemplate(), `afterbegin`);

renderComponent(tasksContainerElement, createTaskEditTemplate());
renderComponentNTimes(tasksContainerElement, createTaskTemplate(), TASK_COUNT);
renderComponent(boardElement, createLoadMoreButtonTemplate());
