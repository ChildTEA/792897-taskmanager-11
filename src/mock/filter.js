const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const generateFilters = (tasks) => {
  const currentDate = new Date();

  let all = 0;
  let overdue = 0;
  let today = 0;
  let favorites = 0;
  let repeating = 0;
  let archive = 0;

  for (let task of tasks) {
    all++;
    overdue += task[`dueDate`] instanceof Date && task[`dueDate`] < Date.now() ? 1 : 0;
    today += task[`dueDate`]
      && task[`dueDate`].getFullYear() === currentDate.getFullYear()
      && task[`dueDate`].getMonth() === currentDate.getMonth()
      && task[`dueDate`].getDate() === currentDate.getDate() ? 1 : 0;
    favorites += task[`isFavorite`] ? 1 : 0;
    repeating += Object.values(task.repeatingDays).some(Boolean) ? 1 : 0;
    archive += task[`isArchive`] ? 1 : 0;
  }

  let result = {
    all,
    overdue,
    today,
    favorites,
    repeating,
    archive,
  };

  return filterNames.map((it) => {
    return {
      name: it,
      count: result[it],
    };
  });
};

export {generateFilters};
