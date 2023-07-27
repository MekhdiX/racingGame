import * as path from 'path';
import nodeExternals from 'webpack-node-externals';

import resolve from '../assets/resolve';

export default () => (webpackConfig) => {
  const config = Object.assign(webpackConfig, {
    entry: './server/index.ts',

    target: 'node',

    externals: [nodeExternals()],

    output: {
      path: path.resolve('dist'),
      filename: 'server.js',
    },

    resolve,

    module: {
      rules: [],
    },

    plugins: [],
  });

  return config;
};
