import 'semantic-ui-css/semantic.min.css';
import './app.css';

import { App } from 'components/App';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import history from 'store/history';

import reducer from './store/reducers';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const enhancer = applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(reducer, preloadedState, composeWithDevTools(enhancer));

export default (): void => {
  ReactDom.hydrate(
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
  );
};
