
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    library: 'epiJS',
    libraryTarget: "umd"
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ],
  },
  externals: {
    'bootstrap': 'bootstrap'
  },
  resolve: {
    extensions: ['.js', '.html'],
  },
};