const ACTIVE_SORT_CLASS_NAME = 'sort__button--active';
const SortNames = {
  ALL: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const createSortTemplate = (sortName) => {
  const dataSortId = Object.keys(SortNames).find((key) => SortNames[key] === sortName).toLowerCase();
  return `<li><a href="#" class="sort__button ${sortName === SortNames.ALL ? ACTIVE_SORT_CLASS_NAME : ''}" data-sort-id="${dataSortId}">Sort by ${sortName}</a></li>`;
};

const createSortCategorites = () => {
  return Object.values(SortNames)
    .map((sortName) => {
      return createSortTemplate(sortName);
    })
    .join((''));
};

export const createSort = () => {
  return `<ul class="sort">
    ${createSortCategorites(SortNames)}
  </ul>`;
};
