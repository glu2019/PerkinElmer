const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("./webpack.dev.js");
const compiler = webpack(config);

new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true
}).listen(3000, "0.0.0.0", function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log("Listening at 0.0.0.0:3000");
});
