import { AppState } from './types';

export const getAuthSelector = (state: AppState) => state.auth;

export const getUserSelector = (state: AppState) => state.user;

export const getSSRSelector = (state: AppState) => state.ssr;

export const getThemeSelector = (state: AppState) => state.theme;

export const getLeaderboardSelector = (state: AppState) => state.leaderboard;

export const getForumTopicsSelector = (state: AppState) => state.forumTopic;
