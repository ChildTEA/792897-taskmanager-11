import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import TasksModel from "./models/tasks.js";
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render} from './utils/render-component.js';


const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);
const filters = generateFilters(tasks);


render(siteHeaderElement, new SiteMenuComponent());
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent);
boardController.render(tasks);
