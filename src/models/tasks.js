import {SortType} from '../components/sorting.js';

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._sortedTasks = [];
    this._sortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
  }

  getTasks(sortType = this._sortType) {
    if (sortType === this._sortType && this._sortedTasks.length !== 0) {
      return this._sortedTasks;
    }

    this._sortedTasks = [];
    this._sortType = sortType;
    const clonedTasks = this._tasks.slice();

    switch (sortType) {
      case SortType.DATE_UP:
        this._sortedTasks = clonedTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        this._sortedTasks = clonedTasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        this._sortedTasks = clonedTasks;
        break;
    }

    return this._sortedTasks;
  }

  getAllTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [...this._tasks.slice(0, index), task, ...this._tasks.slice(index + 1)];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
