import { ForumTopicResponse } from 'api/types';
import { setNotificationError } from 'utils';
import { AppThunkAction } from '../types';
import { SET_FORUM_TOPIC } from 'store/consts';
import { Forum } from 'api/forum';

export const getForumTopic = (): AppThunkAction<string> => async (dispatch) => {
  try {
    const topics = (await Forum.get()) as ForumTopicResponse;

    dispatch({ type: SET_FORUM_TOPIC, payload: topics });
  } catch (error) {
    setNotificationError(error);
  }
};
