const imageLoader = {
  client: {
    test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 100000,
      },
    },
  },
  ssr: {
    test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'null-loader',
  },
};

export default imageLoader;
