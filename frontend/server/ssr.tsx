import { routerMiddleware } from 'connected-react-router';
import { Express, Request, Response } from 'express';
import fetch from 'node-fetch';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { ApiPath, baseUrlResources, getYandexUrl, headersJSON } from '../src/api/consts';
import { HTTP_METHODS } from '../src/api/http';
import { App } from '../src/components/App';
import { setAuth } from '../src/store/actions/auth';
import { setSSR } from '../src/store/actions/ssr';
import { setUserInfo } from '../src/store/actions/user';
import history from '../src/store/history';
import reducer from '../src/store/reducers';
import { getRequestCookies, getResponseCookies, setCookies } from './utils/cookieUtils';
import { renderObject } from './utils/renderObject';

function getHtml(store: ReturnType<typeof createStore>, locationUrl: string): string {
  const state = store.getState();

  const data = renderToString(
    <Provider store={store}>
      <StaticRouter location={locationUrl}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return renderToStaticMarkup(
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: data }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${renderObject(state)}`,
          }}
        />
        <script src="/index.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `Client.default();`,
          }}
        />
      </body>
    </html>
  );
}

export const ssr = (app: Express) => {
  app.get('*', async (req: Request, res: Response) => {
    console.info(req.method, req.hostname, req.url, res.statusCode);
    const enhancer = applyMiddleware(thunk, routerMiddleware(history));
    const store = createStore(reducer, enhancer);

    /** Код полученный от Yandex OAuth */
    const { code } = req.query;

    /** Получение данных пользователя */
    const getUser = async (headers: Record<string, string | undefined>) => {
      try {
        const response = await fetch(getYandexUrl(ApiPath.USER), {
          method: HTTP_METHODS.GET,
          headers,
        });

        if (response.ok) {
          const userInfo = await response.json();

          store.dispatch(setUserInfo({ ...userInfo, avatar: `${baseUrlResources}${userInfo.avatar}` }));
          store.dispatch(setAuth(true));
        }
      } catch (error) {
        console.warn(error);
      } finally {
        store.dispatch(setSSR(true));

        res.send(getHtml(store, req.url));
      }
    };

    if (code) {
      try {
        const response = await fetch(ApiPath.YANDEX_OAUTH, {
          method: HTTP_METHODS.POST,
          headers: headersJSON,
          body: JSON.stringify({ code, redirect_uri: process.env.MAIN_HOST }),
        });

        setCookies(response, res);

        getUser(getResponseCookies(response));
      } catch (error) {
        console.warn(error);

        getUser(getRequestCookies(req));
      }
    } else {
      getUser(getRequestCookies(req));
    }
  });
};
