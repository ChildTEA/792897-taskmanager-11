import API from './api.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterController from "./controllers/filter.js";
import SiteMenuComponent, {MenuItem} from './components/site-menu.js';
import StatisticsComponent from './components/statistics.js';

import TasksModel from './models/tasks.js';
import {render} from './utils/render-component.js';

const AUTHORIZATION = `Basic 66KhlulhuFtahgn9`;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const api = new API(AUTHORIZATION);
const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const tasksModel = new TasksModel();

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});


render(siteHeaderElement, siteMenuComponent);
render(siteMainElement, boardComponent);
render(siteMainElement, statisticsComponent);

statisticsComponent.hide();

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

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
