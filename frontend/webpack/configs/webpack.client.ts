import flow from 'lodash.flow';

import { initClientConfig, loadCss, loadFiles, loadImage, loadScripts } from '../settings';

function getConfig() {
  return flow([
    initClientConfig(),
    loadScripts({ isSSR: true }),
    loadImage({ isSSR: false }),
    loadCss({ isSSR: false }),
    loadFiles({ isSSR: false }),
  ])({});
}

export default getConfig;
