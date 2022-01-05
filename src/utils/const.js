export const SortType = {
  DEFAULT: 'default',
  DATE: 'date-down',
  RATING: 'date-up',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  CHANGE_SORT: 'CHANGE_SORT',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  CHANGE_FILTER: 'CHANGE_FILTER',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};


export const FilterType = {
  All: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATS: 'stats',
};
