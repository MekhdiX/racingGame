import { Action } from '../actions/types';
import { SET_AUTH } from '../consts';

const auth = (state = false, { type, payload }: Action<boolean>) => {
  switch (type) {
    case SET_AUTH:
      return payload;
    default:
      return state;
  }
};

export default auth;
