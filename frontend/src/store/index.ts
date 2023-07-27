import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import history from './history';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer = applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(reducer, composeWithDevTools(enhancer));

export default store;
