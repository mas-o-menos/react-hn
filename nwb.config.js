var HtmlWebpackPlugin = require('html-webpack-plugin')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
var StatsWebpackPlugin = require('stats-webpack-plugin')

module.exports = {
  type: 'react-app',
  babel: {
    loose: true,
    stage: false,
    presets: ['es2015', 'stage-0', 'react']
  },
  webpack: {
    loaders: {
      babel: {
        babelrc: true,
        cacheDirectory: true
      }
    },
    plugins: {
      define: {
        __VERSION__: JSON.stringify(require('./package.json').version)
      }
    },
    extra: {
      plugins: [
        new CommonsChunkPlugin({
          names: ['core'],
          filename: '[name].js',
          minChunks: Infinity
        }), 
        new HtmlWebpackPlugin({
          filename: 'views/index.ejs',
          template: 'src/views/index.ejs',
          markup: '<div id="app"><%- markup %></div>'
        }),
        new StatsWebpackPlugin('../stats/webpack.json', {
          assets: true,
          performance: true,
          timings: true,
          children: false,
          source: false,
          modules: false,
          chunks: false,
        })
      ]
    }    
  }
}
