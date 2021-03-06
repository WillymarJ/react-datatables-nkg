// Webpack config
const webpack = require('webpack');
const path = require('path');

const resourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './dist');

const libraryName = 'react-datatable-nkg';

const plugins = [];
const loaders = [
  {
    test: /\.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      babelrc: false,
      presets: [
        ['es2015', { modules: false }],
        "react",
        "stage-2"
      ]
    }
  },
];

// Environment settings
plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false
    },
  })
);

// Configuration
module.exports = {
  devtool: 'cheap-source-map',
  context: resourcePath,
  entry: {
    index: './index.js'
  },
  output: {
    path: buildPath + '/',
    filename: libraryName + '.min.js',
    library: libraryName,
    libraryTarget: 'umd'
  },
  // Ignore these vendor libraries from being bundled in dist/
  externals: ['react', 'react-dom', 'react-bootstrap'],
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      resourcePath,
      path.resolve(__dirname, 'node_modules')
    ]
  },
  plugins
};
