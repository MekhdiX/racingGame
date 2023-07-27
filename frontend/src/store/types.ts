import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from 'store';

export type AppState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<AppState, unknown, Action>;
export type AppThunkAction<T> = ThunkAction<void, AppState, unknown, Action<T>>;
