const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_FOLDER = path.resolve(__dirname, 'src');
const PUBLIC_FOLDER = path.resolve(__dirname, 'public');
const OUTPUT_FOLDER = path.resolve(__dirname, 'lib');
const ASSETS_FOLDER = path.resolve(SOURCE_FOLDER, 'assets');

module.exports = {
  entry: path.resolve(SOURCE_FOLDER, 'index.tsx'),
  devtool: 'inline-source-map',
  plugins: [new HtmlWebpackPlugin({template: path.join(PUBLIC_FOLDER, 'index.html')})],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      components: path.resolve(SOURCE_FOLDER, 'components'),
      src: SOURCE_FOLDER,
      assets: ASSETS_FOLDER
    }
  },
  output: {
    path: OUTPUT_FOLDER,
    filename: 'index.js',
    environment: {
      arrowFunction: false
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: SOURCE_FOLDER,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        use: 'file-loader'
      }
    ]
  }
};
