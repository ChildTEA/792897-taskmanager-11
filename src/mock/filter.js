const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const getFiltersCount = (filter, tasks) => {
  switch (filter) {
    case `all`:
      return tasks.length;
    case `overdue`:
      return tasks.filter((it) => it.dueDate instanceof Date && it.dueDate < Date.now()).length;
    case `today`:
      const today = new Date();

      return tasks.filter((it) => {
        return it.dueDate
        && it.dueDate.getFullYear() === today.getFullYear()
        && it.dueDate.getMonth() === today.getMonth()
        && it.dueDate.getDate() === today.getDate();
      }).length;
    case `favorites`:
      return tasks.filter((it) => it.isFavorite).length;
    case `repeating`:
      return tasks.filter((it) => Object.values(it.repeatingDays).some(Boolean)).length;
    case `archive`:
      return tasks.filter((it) => it.isArchive).length;
    default:
      return 0;
  }
};

const generateFilters = (tasks) => {

  return filterNames.map((it) => {
    return {
      name: it,
      count: getFiltersCount(it, tasks),
    };
  });
};

export {generateFilters};
