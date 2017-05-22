var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// creates an index.html for us and put it in the dist folder
// will also include the script in the index.html for us


module.exports = {
  entry: './app/App.js',
  output: {
    path : path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
    module: {
      rules: [
        { test: /\.(js)$/, use: 'babel-loader', exclude: [/node_modules/]},
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
      ]
    },
    devServer: {
    historyApiFallback: true,
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'app/index.html'
    })]
}
