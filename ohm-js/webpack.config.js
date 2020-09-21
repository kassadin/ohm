'use strict';

var path = require('path');
var webpack = require('webpack');

var version = require('./package.json').version;

module.exports = function(env, argv) {
  return {
    entry: './src/main.js',
    output: {
      library: 'ohm',
      libraryTarget: 'umd',
      filename: argv.mode === 'development' ? 'ohm.js': 'ohm.min.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: argv.mode === 'development' ? 'inline-source-map' : false,
    plugins: [
      new webpack.DefinePlugin({
        __GLOBAL_OHM_VERSION__: JSON.stringify(version)
      }),
      // Prevent package.json from being included in the bundle -- it is required from version.js,
      // but it is only used when `__GLOBAL_OHM_VERSION__` (see above) is not defined.
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\.\/package\.json$/
      })
    ]
  };
};