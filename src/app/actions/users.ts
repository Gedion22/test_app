import {createAction} from 'typesafe-actions';

export const removeUser = createAction('REMOVE_USER')<number>();
export const setCurrentUser = createAction('SET_CURRENT_USER')<number>();
export const toggleLikeUser = createAction('TOGGLE_LIKE_USER')();
