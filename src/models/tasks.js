import {SortType} from '../components/sorting.js';
import {getTasksByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._sortedTasks = [];
    this._activeFilterType = FilterType.ALL;
    this._sortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  addTask(task) {
    this._tasks = [].concat(task, this._tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  getTasks(sortType = this._sortType) {
    if (sortType !== this._sortType
      || this._sortedTasks.length === 0
      || this._sortedTasks.length !== this._tasks.length) {
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
    }

    return getTasksByFilter(this._sortedTasks, this._activeFilterType);
  }

  getTasksAll() {
    return this._tasks;
  }

  removeTask(id) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), this._tasks.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
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

    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));


    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
