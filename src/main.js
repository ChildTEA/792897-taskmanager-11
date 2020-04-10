import {createSiteMenuTemplate} from "./components/site-menu.js";
import {generateFilters} from "./mock/filter.js";
import {createFilterTemplate} from "./components/filter.js";
import {generateTasks} from "./mock/taks.js";
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

// const renderComponentNTimes = (container, template, count = 1, place = `beforeend`) => {
//   for (let i = 0; i < count; i++) {
//     container.insertAdjacentHTML(place, template);
//   }
// };


renderComponent(siteHeaderElement, createSiteMenuTemplate());

const filters = generateFilters();

renderComponent(siteMainElement, createFilterTemplate(filters));
renderComponent(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board.container`);
const tasksContainerElement = boardElement.querySelector(`.board__tasks`);

renderComponent(boardElement, createSortingTemplate(), `afterbegin`);

const tasks = generateTasks(TASK_COUNT);

renderComponent(tasksContainerElement, createTaskEditTemplate(tasks[0]));

for (let i = 1; i < tasks.length; i++) {
  renderComponent(tasksContainerElement, createTaskTemplate(tasks[i]));
}

// renderComponentNTimes(tasksContainerElement, createTaskTemplate(), TASK_COUNT);
renderComponent(boardElement, createLoadMoreButtonTemplate());
