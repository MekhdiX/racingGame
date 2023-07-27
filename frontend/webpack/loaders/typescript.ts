const loaderScripts = {
  client: {
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'ts-loader',
    exclude: /\.test.tsx?$/,
    options: {
      configFile: 'tsconfig.prod.json',
    },
  },
  ssr: {
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'ts-loader',
    exclude: /\.test.tsx?$/,
    options: {
      configFile: 'tsconfig.prod.json',
    },
  },
};

export default loaderScripts;
