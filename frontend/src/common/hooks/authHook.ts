import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { getAuthSelector } from 'store/selectors';
import isServer from 'utils/isServerEnvCheker';
import { ROUTES } from 'common';

export const useAuth = (): void => {
  const history = useHistory();
  const isAuth = useSelector(getAuthSelector);
  const isSignInAndUp = [ROUTES.SIGNIN, ROUTES.SIGNUP].some(useRouteMatch);

  const defaultUseEffect = isServer ? useEffect : useLayoutEffect;

  defaultUseEffect(() => {
    isAuth && isSignInAndUp && history.replace(ROUTES.HOME);
    !isAuth && !isSignInAndUp && history.replace(ROUTES.SIGNIN);
  }, [isAuth, isSignInAndUp]);
};
