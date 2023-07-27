const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'ts-loader',
        exclude: /\.test.tsx?$/,
        options: {
          configFile: 'tsconfig.prod.json',
        },
      },
    ],
  },
});
