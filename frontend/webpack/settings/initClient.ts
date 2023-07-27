import * as path from 'path';

import resolve from '../assets/resolve';

export default () => (webpackConfig) => {
  const config = Object.assign(webpackConfig, {
    entry: './src/index.tsx',

    output: {
      path: path.resolve('dist/static'),
      filename: 'index.js',
      library: 'Client',
    },

    resolve,

    module: {
      rules: [],
    },

    plugins: [],
  });

  return config;
};
