import { SET_SSR } from '../consts';

export const setSSR = (payload: boolean) => ({ type: SET_SSR, payload });
