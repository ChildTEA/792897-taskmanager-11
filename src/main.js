import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterController from "./controllers/filter.js";
import SiteMenuComponent, {MenuItem} from './components/site-menu.js';
import StatisticsComponent from './components/statistics.js';
import TasksModel from './models/tasks.js';
import {generateTasks} from './mock/task.js';
import {render} from './utils/render-component.js';


const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent();

render(siteHeaderElement, siteMenuComponent);
render(siteMainElement, boardComponent);
render(siteMainElement, statisticsComponent);

statisticsComponent.hide();
boardController.render(tasks);

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});
