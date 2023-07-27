import { Action } from '../actions/types';
import { SET_THEME } from '../consts';

const theme = (state = 'light', { type, payload }: Action<string>) => {
  switch (type) {
    case SET_THEME:
      return payload;
    default:
      return state;
  }
};

export default theme;
