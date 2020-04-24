import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import TaskEditComponent from './components/task-editor.js';
import TaskComponent from './components/task.js';
import TasksComponent from './components/tasks.js';
import NoTasksComponent from './components/no-tasks.js';
import SiteMenuComponent from './components/site-menu.js';
import SortComponent from './components/sorting.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {renderComponent} from './utils.js';


const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    evt.preventDefault();

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderComponent(taskListElement, taskComponent.getElement());
};


const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived || tasks.length === 0) {
    renderComponent(boardComponent.getElement(), new NoTasksComponent().getElement());
    return;
  }

  renderComponent(boardComponent.getElement(), new SortComponent().getElement());
  renderComponent(boardComponent.getElement(), new TasksComponent().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  if (tasks.length > SHOWING_TASKS_COUNT_ON_START) {
    const loadMoreButtonComponent = new LoadMoreButtonComponent();
    renderComponent(boardComponent.getElement(), loadMoreButtonComponent.getElement());

    loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);


renderComponent(siteHeaderElement, new SiteMenuComponent().getElement());
renderComponent(siteMainElement, new FilterComponent(filters).getElement());

const boardComponent = new BoardComponent();
renderComponent(siteMainElement, boardComponent.getElement());
renderBoard(boardComponent, tasks);


/*
Вопрос:
Почему в renderComponent используется prepend и append, если они считаются экспериментальными и со слабой поддержкой?
Почему нельзя использовать appendChild и т.п.

Вроде бы, первое позволяет работать с набором элементов, но на сколько это актуально?
https://developer.mozilla.org/ru/docs/Web/API/ParentNode
https://developer.mozilla.org/ru/docs/Web/API/Node
*/
