import { get, put, putFormData } from 'api/http';
import { ApiPath, headersJSON as headers } from 'api/consts';
import { Profile } from 'pages/Profile/types';
import { UserInfoResponse } from './types';

interface User {
  getUser: () => Promise<UserInfoResponse>;
  changeUserInfo: (data: Profile) => Promise<UserInfoResponse>;
  changeAvatar: (data: FormData) => Promise<UserInfoResponse>;
}

export const User: User = {
  getUser: (): Promise<UserInfoResponse> => get(ApiPath.USER),

  changeUserInfo: (profile: Profile): Promise<UserInfoResponse> => put<Profile, UserInfoResponse>(ApiPath.PROFILE, profile, { headers }),

  changeAvatar: (profile: FormData): Promise<UserInfoResponse> => putFormData<UserInfoResponse>(ApiPath.AVATAR, profile),
};
