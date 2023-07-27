import { createBrowserHistory, createMemoryHistory } from 'history';
import isServer from 'utils/isServerEnvCheker';

export default !isServer ? createBrowserHistory() : createMemoryHistory();
