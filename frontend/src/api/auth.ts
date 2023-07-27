import { ApiPath, headersJSON as headers } from 'api/consts';

import { get, post } from './http';
import { LogOutResponse, SignInData, SignInResponse, SignUpData, SignUpResponse, YandexOAuthServiceId } from './types';

interface Auth {
  signUp: (data: SignUpData) => Promise<SignUpResponse>;
  signIn: (data: SignInData) => Promise<SignInResponse>;
  logOut: () => Promise<LogOutResponse>;
  getYandexOAuthServiceId: () => Promise<YandexOAuthServiceId>;
}

export const Auth: Auth = {
  signUp: (data: SignUpData): Promise<SignUpResponse> => post(ApiPath.SIGN_UP, data, { headers }),

  signIn: (data: SignInData): Promise<SignInResponse> => post(ApiPath.SIGN_IN, data, { headers }),

  logOut: (): Promise<LogOutResponse> => post(ApiPath.LOG_OUT),

  getYandexOAuthServiceId: (): Promise<YandexOAuthServiceId> => get(`${ApiPath.YANDEX_OAUTH_ID}?redirect_uri=${window.location.origin}`),
};
