import {ActionType, createReducer} from 'typesafe-actions';
import {toggleLikeUser, removeUser, setCurrentUser} from '../actions/users';
import {TUser} from '../API';
import {fetchUsersAsync} from '../asyncActions/users';

type TUsersState = {
    items: TUser[];
    itemsLength: number;
    status: string;
    currentUserId: number | null;
};

const initialState: TUsersState = {
    items: [],
    itemsLength: 0,
    status: 'loading',
    currentUserId: null,
};

export type TUsersActions = ActionType<
    | typeof removeUser
    | typeof fetchUsersAsync.request
    | typeof fetchUsersAsync.success
    | typeof toggleLikeUser
    | typeof setCurrentUser
>;

export const usersReducer = createReducer<TUsersState, TUsersActions>(initialState)
    .handleAction(removeUser, (state, action) => {
        const newItems = state.items.filter(item => item.id !== action.payload);
        return {...state, items: newItems, itemsLength: newItems.length};
    })
    .handleAction(fetchUsersAsync.request, state => ({...state, status: 'loading'}))
    .handleAction(fetchUsersAsync.success, (state, action) => ({
        ...state,
        status: 'idle',
        items: action.payload.users,
        itemsLength: action.payload.length,
    }))
    .handleAction(setCurrentUser, (state, action) => {
        return {...state, currentUserId: action.payload};
    })
    .handleAction(toggleLikeUser, state => {
        const currentUserIndex = state.items.findIndex(item => item.id === state.currentUserId);
        const newItems = [...state.items];
        newItems[currentUserIndex].like = !newItems[currentUserIndex].like;
        return {...state, items: newItems};
    });
