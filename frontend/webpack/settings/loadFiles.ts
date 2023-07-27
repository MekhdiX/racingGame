import CopyPlugin from 'copy-webpack-plugin';

import { ROOT_DIR_FROM_WEBPACK } from '../assets/dir';
import { Options } from '../types';

export default ({ isSSR }: Options) => (webpackConfig) => {
  if (!isSSR) {
    webpackConfig.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: `${ROOT_DIR_FROM_WEBPACK}/sw.js`,
          },
        ],
      })
    );
  }

  return webpackConfig;
};
