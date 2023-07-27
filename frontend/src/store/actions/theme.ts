import { Theme } from '../../api/theme';
import { GET_THEME, SET_THEME } from '../consts';
import { AppState, AppThunkAction } from '../types';

export const setTheme = (payload: string) => ({ type: SET_THEME, payload });

export const getTheme = (): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: GET_THEME });

  try {
    const user = await dispatch((_, gestState: () => AppState) => gestState().user.login);

    const response = await Theme.getTheme(user);

    dispatch(setTheme(response.theme));
  } catch (error) {
    console.warn(error);
  }
};

export const setUserTheme = (theme: string): AppThunkAction<string> => async (dispatch) => {
  dispatch(setTheme(theme));

  const auth = dispatch((_, gestState: () => AppState) => gestState().auth);

  if (auth) {
    try {
      const user = dispatch((_, gestState: () => AppState) => gestState().user.login);

      await Theme.setTheme({ theme, user });
    } catch (error) {
      console.warn(error);
    }
  }
};
