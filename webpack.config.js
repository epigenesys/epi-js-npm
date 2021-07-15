
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    minimize: false,
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'epi-js.css' })],
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          }
        ]
      }
    ],
  },
  externals: {
    'bootstrap': 'bootstrap'
  },
  resolve: {
    extensions: ['.js', '.scss', '.html'],
  },
};