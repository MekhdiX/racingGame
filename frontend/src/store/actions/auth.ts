import { Auth } from 'api/auth';
import { SignInData, SignUpData } from 'api/types';
import { push } from 'connected-react-router';
import { AppThunkAction } from '../types';
import { ROUTES } from 'common/consts';
import { setNotificationError } from 'utils/notifications';
import { clearUserInfo, getUserAction } from './user';
import { LOG_OUT, SET_AUTH, SIGN_IN, SIGN_IN_YANDEX_OAUTH, SIGN_UP } from 'store/consts';
import { yandexOauthUrl } from 'api/consts';
import { setTheme } from './theme';

export const setAuth = (payload: boolean) => ({ type: SET_AUTH, payload });

export const signInAction = (data: SignInData): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: SIGN_IN });

  try {
    await Auth.signIn(data);

    await dispatch(getUserAction());
    dispatch(push(ROUTES.HOME));
  } catch (error) {
    setNotificationError(error);
  }
};

export const signInYandexAction = (): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: SIGN_IN_YANDEX_OAUTH });

  try {
    const response = await Auth.getYandexOAuthServiceId();

    window.location.href = `${yandexOauthUrl}&client_id=${response.service_id}&redirect_uri=${window.location.origin}`;
  } catch (error) {
    setNotificationError(error);
  }
};

export const signUpAction = (data: SignUpData): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: SIGN_UP });

  try {
    await Auth.signUp(data);

    await dispatch(getUserAction());
    dispatch(push(ROUTES.HOME));
  } catch (error) {
    setNotificationError(error);
  }
};

export const logOutAction = (): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: LOG_OUT });

  try {
    await Auth.logOut();

    dispatch(setAuth(false));
    dispatch(clearUserInfo());
    dispatch(setTheme('light'));
    dispatch(push(ROUTES.SIGNIN));
  } catch (error) {
    setNotificationError(error);
  }
};
