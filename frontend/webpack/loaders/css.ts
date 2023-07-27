import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';

const cssLoader = {
  client: {
    test: /\.css$/i,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`,
        },
      },
      'css-loader',
      'postcss-loader',
    ],
  },
  ssr: {
    test: /\.css$/i,
    loader: 'null-loader',
  },
};

export default cssLoader;
