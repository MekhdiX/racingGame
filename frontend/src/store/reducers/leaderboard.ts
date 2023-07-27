import { LeaderboardResponse } from 'api/types';
import { Action } from 'store/actions/types';

import { SET_LEADERBOARD } from 'store/consts';

const leaderboard = (state = [] as LeaderboardResponse, { type, payload }: Action<LeaderboardResponse>) => {
  switch (type) {
    case SET_LEADERBOARD:
      return payload;
    default:
      return state;
  }
};

export default leaderboard;
