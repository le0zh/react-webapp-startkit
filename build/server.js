var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(3001, 'localhost', function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3001/');
});
