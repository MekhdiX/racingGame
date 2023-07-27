import { ApiPath, headersJSON as headers } from 'api/consts';
import { post } from 'api/http';
import { FeedBack } from 'api/types';

interface Feedback {
  send: (data: FeedBack) => Promise<void>;
}

export const Feedback: Feedback = {
  send: (data: FeedBack): Promise<void> => post(ApiPath.FEEDBACK, data, { headers }),
};
