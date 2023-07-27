import { Action } from '../actions/types';
import { SET_SSR } from '../consts';

const initialState: boolean = false;

const ssr = (state = initialState, { type, payload }: Action<boolean>) => {
  switch (type) {
    case SET_SSR:
      return payload;
    default:
      return state;
  }
};

export default ssr;
