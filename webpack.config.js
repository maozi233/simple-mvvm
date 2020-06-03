const path = require('path');
// const KB = 1024;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
}