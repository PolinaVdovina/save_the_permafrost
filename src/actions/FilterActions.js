import * as types from '../constants/ActionTypes';

export function setFilter(key, filters) {
  return {
    type: types.SET_FILTER,
    key,
    filters
  };
}


export function setPagination(key, pagination) {
  return {
    type: types.SET_PAGINATION,
    pagination,
    key
  };
}
