import { headersJSON as headers } from 'api/consts';
import { get, post } from 'api/http';
import { ApiPath } from './consts';
import { ForumTopic, ForumTopicCreate, ForumTopicResponse } from 'api/types';

interface Forum {
  create: (data: ForumTopic) => Promise<void>;
  get: () => Promise<ForumTopicResponse>;
  createComment: (data: ForumTopicCreate) => Promise<void>;
}

export const Forum: Forum = {
  create: (data: ForumTopic): Promise<void> => post(ApiPath.FORUM_TOPIC, data, { headers }),
  get: (): Promise<ForumTopicResponse> => get(ApiPath.FORUM_TOPIC, { headers }),
  createComment: (data: ForumTopicCreate): Promise<void> => post(ApiPath.FORUM_COMMENT, data, { headers }),
};
