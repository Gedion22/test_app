import {RootState} from '../store';

export const getUsers = (state: RootState) => state.users.items;

export const getCurrentUserId = (state: RootState) => state.users.currentUserId;
