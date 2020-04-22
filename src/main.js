import {createSiteMenuTemplate} from "./components/site-menu.js";
import {generateFilters} from "./mock/filter.js";
import {createFilterTemplate} from "./components/filter.js";
import {generateTasks} from "./mock/task.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-editor.js";
import {createBoardTemplate} from "./components/board.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";

const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASK_COUNT);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

renderComponent(siteHeaderElement, createSiteMenuTemplate());

const filters = generateFilters(tasks);

renderComponent(siteMainElement, createFilterTemplate(filters));
renderComponent(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board.container`);
const tasksContainerElement = boardElement.querySelector(`.board__tasks`);

renderComponent(boardElement, createSortingTemplate(), `afterbegin`);

renderComponent(tasksContainerElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START < TASK_COUNT ? SHOWING_TASKS_COUNT_ON_START : TASK_COUNT;

tasks.slice(1, showingTasksCount)
  .forEach((it) => renderComponent(tasksContainerElement, createTaskTemplate(it)));

renderComponent(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => renderComponent(tasksContainerElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});

