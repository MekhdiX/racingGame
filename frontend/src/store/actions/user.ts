import { UserInfoResponse } from 'api/types';
import { User } from 'api/user';
import { t } from 'common';
import { Profile } from 'pages/Profile/types';
import { CHANGE_AVATAR, CHANGE_USER_INFO, GET_USER, SET_USER_INFO } from 'store/consts';
import { AppThunkAction } from 'store/types';
import { setNotificationError, setNotificationSuccess } from 'utils';
import { setAuth } from './auth';
import { baseUrlResources } from 'api/consts';

export const setUserInfo = (payload: UserInfoResponse) => ({ type: SET_USER_INFO, payload });

export const clearUserInfo = () => ({ type: SET_USER_INFO, payload: {} as UserInfoResponse });

export const getUserAction = (): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: GET_USER });

  try {
    const userInfo = await User.getUser();

    const avatar = userInfo.avatar ? `${baseUrlResources}${userInfo.avatar}` : '';

    dispatch(setUserInfo({ ...userInfo, avatar }));
    dispatch(setAuth(true));
  } catch (error) {
    dispatch(setAuth(false));
  }
};

export const changeUserInfoAction = (data: Profile): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: CHANGE_USER_INFO });

  try {
    const userInfo = await User.changeUserInfo(data);

    dispatch(setUserInfo({ ...userInfo, avatar: `${baseUrlResources}${userInfo.avatar}` }));
    setNotificationSuccess(t('changesSaved'));
  } catch (error) {
    setNotificationError(error);
  }
};

export const changeAvatarAction = (data: FormData): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: CHANGE_AVATAR });

  try {
    const userInfo = await User.changeAvatar(data);

    dispatch(setUserInfo({ ...userInfo, avatar: `${baseUrlResources}${userInfo.avatar}` }));
    setNotificationSuccess(t('avatarChanged'));
  } catch (error) {
    setNotificationError(error);
  }
};
