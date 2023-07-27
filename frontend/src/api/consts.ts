export const baseHost = 'https://ya-praktikum.tech';
export const baseUrl = `${baseHost}/api/v2`;
export const yandexProxyPrefix = '/yandexProxy';
export const baseUrlResources = `${yandexProxyPrefix}/resources`;
export const headersJSON = {
  'Content-Type': 'application/json',
};
export const yandexOauthUrl = 'https://oauth.yandex.ru/authorize?response_type=code';

export const ApiPath = {
  SIGN_UP: `${yandexProxyPrefix}/auth/signup`,
  SIGN_IN: `${yandexProxyPrefix}/auth/signin`,
  LOG_OUT: `${yandexProxyPrefix}/auth/logout`,
  USER: `${yandexProxyPrefix}/auth/user`,
  PROFILE: `${yandexProxyPrefix}/user/profile`,
  AVATAR: `${yandexProxyPrefix}/user/profile/avatar`,
  GET_LEADERBOARD: `${yandexProxyPrefix}/leaderboard/all`,
  SET_LEADERBOARD: `${yandexProxyPrefix}/leaderboard`,
  YANDEX_OAUTH: `${baseUrl}/oauth/yandex`,
  YANDEX_OAUTH_ID: `${baseUrl}/oauth/yandex/service-id`,
  THEME: `/api/v1/theme`,
  FEEDBACK: `/api/v1/feedback`,
  FORUM_TOPIC: `/api/v1/forum/topic`,
  FORUM_COMMENT: `/api/v1/forum/comment`,
};

export const getYandexUrl = (proxyPath: string) => baseUrl + proxyPath.replace(yandexProxyPrefix, '');
