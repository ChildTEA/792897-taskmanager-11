import StatisticsComponent from './components/statistics.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterComponent from './components/filter.js';
import SiteMenuComponent, {MenuItem} from './components/site-menu.js';
<<<<<<< HEAD
=======
import StatisticsComponent from './components/statistics.js';
import TasksModel from './models/tasks.js';
>>>>>>> c0e24fd... Feat: Реализовано переключение экранов.
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render} from './utils/render-component.js';


const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);


render(siteHeaderElement, siteMenuComponent);
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
<<<<<<< HEAD
const boardController = new BoardController(boardComponent);
=======
const boardController = new BoardController(boardComponent, tasksModel);
const siteMenuComponent = new SiteMenuComponent();
>>>>>>> c0e24fd... Feat: Реализовано переключение экранов.
const statisticsComponent = new StatisticsComponent();

render(siteMainElement, boardComponent);
<<<<<<< HEAD
render(boardComponent.getElement(), statisticsComponent);
=======
render(siteMainElement, statisticsComponent);

statisticsComponent.hide();
>>>>>>> c0e24fd... Feat: Реализовано переключение экранов.
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
