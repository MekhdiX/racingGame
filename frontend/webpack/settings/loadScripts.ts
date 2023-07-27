import loaderScripts from '../loaders/typescript';
import { Options } from '../types';

export default ({ isSSR }: Options) => (webpackConfig) => {
  webpackConfig.module.rules.push(!isSSR ? loaderScripts.client : loaderScripts.ssr);

  return webpackConfig;
};
