/* eslint-disable no-undef */
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[contenthash].js',
    // eslint-disable-next-line function-call-argument-newline
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  mode: 'production',
  devServer: {
    hot: true,
    static: {
      // eslint-disable-next-line function-call-argument-newline
      directory: path.join(__dirname, '')
    },
    // eslint-disable-next-line array-element-newline
    watchFiles: ['src/**/*.js', '**/*.html']
  },
  devtool: 'cheap-source-map',
  // eslint-disable-next-line array-bracket-newline
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  // eslint-disable-next-line array-bracket-newline
  ]
};
