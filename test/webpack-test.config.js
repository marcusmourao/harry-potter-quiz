const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  mode: 'none',
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map',
  output: {
    // ...
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  resolve: {
    alias: {
      '@': path.resolve(`${__dirname}/../`),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ['vue-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
