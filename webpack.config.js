const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ogg|wav|mp3)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.csv$/i,
        loader: 'csv-loader',
        options: {
          header: false,
        }
      }
    ],
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist'
  }
};
