export const baseHost = "https://ya-praktikum.tech";
export const baseUrl = `${baseHost}/api/v2`;
export const yandexProxyPrefix = "/yandexProxy";
export const headersJSON = {
  "Content-Type": "application/json",
};

export const ApiPath = {
  SIGN_UP: "/auth/signup",
  SIGN_IN: "/auth/signin",
  LOG_OUT: "/auth/logout",
  USER: "/auth/user",
  PROFILE: "/user/profile",
  AVATAR: "/user/profile/avatar",
  RESOURCES: "/resources",
  GET_LEADERBOARD: "/leaderboard/all",
  SET_LEADERBOARD: "/leaderboard",
};

export const getYandexUrl = (proxyPath: string) => baseUrl + proxyPath;
