import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import css from '../loaders/css';
import { Options } from '../types';

export default ({ isSSR }: Options) => (webpackConfig) => {
  if (!isSSR) {
    webpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'main.css',
      })
    );
  }

  webpackConfig.module.rules.push(!isSSR ? css.client : css.ssr);

  return webpackConfig;
};
