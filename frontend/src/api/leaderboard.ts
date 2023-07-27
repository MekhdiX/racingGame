import { ApiPath, headersJSON as headers } from 'api/consts';
import { post } from 'api/http';
import { LeaderboardResponse, UserInfoResponse } from 'api/types';

export const leaderboard = {
  getAll(): Promise<LeaderboardResponse> {
    return post(
      ApiPath.GET_LEADERBOARD,
      {
        cursor: 0,
        ratingFieldName: 'casablanca_score',
        limit: 20,
      },
      { headers }
    );
  },

  save(score: number, level: number, user: UserInfoResponse): Promise<LeaderboardResponse> | undefined {
    return post(
      ApiPath.SET_LEADERBOARD,
      {
        data: {
          casablanca_score: score,
          level,
          login: user.login,
          avatar: user.avatar,
        },
        ratingFieldName: 'casablanca_score',
      },
      { headers }
    );
  },
};
