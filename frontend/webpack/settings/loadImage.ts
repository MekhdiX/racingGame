import imageLoader from '../loaders/image';
import { Options } from '../types';

export default ({ isSSR }: Options) => (webpackConfig) => {
  webpackConfig.module.rules.push(!isSSR ? imageLoader.client : imageLoader.ssr);

  return webpackConfig;
};
