import { ForumTopicResponse } from 'api/types';
import { Action } from 'store/actions/types';

import { SET_FORUM_TOPIC } from 'store/consts';

const forumTopic = (state = [] as ForumTopicResponse, { type, payload }: Action<ForumTopicResponse>) => {
  switch (type) {
    case SET_FORUM_TOPIC:
      return payload;
    default:
      return state;
  }
};

export default forumTopic;
