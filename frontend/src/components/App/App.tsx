import './App.css';

import { ROUTES } from 'common/consts';
import { useThunkAction } from 'common/hooks/actionHooks';
import Root from 'components/Root';
import Forum from 'pages/Forum';
import ForumView from 'pages/ForumView';
import { Game } from 'pages/Game';
import Home from 'pages/Home';
import Leaderboard from 'pages/Leaderboard';
import Profile from 'pages/Profile';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import React, { FC, useEffect } from 'react';
import { NotificationContainer } from 'react-notifications';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { getUserAction } from 'store/actions/user';
import { getAuthSelector, getSSRSelector } from 'store/selectors';
import Feedback from 'pages/Feedback';
import ForumCreate from 'pages/ForumCreate';
import { getTheme } from 'store/actions/theme';

export const App: FC = () => {
  const history = useHistory();

  const isSSR = useSelector(getSSRSelector);
  const auth = useSelector(getAuthSelector);

  const getUser = useThunkAction(getUserAction);
  const getUserTheme = useThunkAction(getTheme);

  const isSignIn = [ROUTES.SIGNIN, ROUTES.SIGNUP].some(useRouteMatch);

  // Редирект после Yandex OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.href);

    if (params.has('code')) {
      history.replace(ROUTES.ROOT);
    }
  }, []);

  // Установка темы пользователя
  useEffect(() => {
    auth && getUserTheme();
  }, [auth]);

  // Получение инфо по текущему пользователю
  useEffect(() => {
    !isSSR && !isSignIn && getUser();
  }, []);

  return (
    <>
      <Switch>
        <Route path={ROUTES.ROOT} exact component={Root} />
        <Route path={ROUTES.SIGNIN} component={SignIn} />
        <Route path={ROUTES.SIGNUP} component={SignUp} />
        <Route path={ROUTES.FORUM_BY_CATEGORY} component={Forum} exact />
        <Route path={ROUTES.FORUM_CREATE} component={ForumCreate} />
        <Route path={ROUTES.FORUM_VIEW} component={ForumView} exact />
        <Route path={ROUTES.FORUM} component={Forum} />
        <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.LEADERBOARD} component={Leaderboard} />
        <Route path={ROUTES.GAME} component={Game} />
        <Route path={ROUTES.FEEDBACK} component={Feedback} />
      </Switch>
      <NotificationContainer />
    </>
  );
};
