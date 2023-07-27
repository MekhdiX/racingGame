import flow from 'lodash.flow';

import { initServerConfig, loadCss, loadImage, loadScripts } from '../settings';

function getConfig() {
  return flow([initServerConfig(), loadScripts({ isSSR: true }), loadImage({ isSSR: true }), loadCss({ isSSR: true })])({});
}

export default getConfig;
