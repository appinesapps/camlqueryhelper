const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const path = require("path");

const webpack = require('webpack');
const config = require('./webpack.dev.js');
const compiler = webpack(config);

app.use(require('morgan')('short'));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
  	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler,{
	log: console.log, 
	path: '/__webpack_hmr', 
	heartbeat: 10 * 1000
}));

app.use(express.static('dist'));


app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./dist/index.html"))
);


// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
// 
// app.listen(port, address, function (error) {
//   if (error) throw error;
//   console.log('server running at http://%s:%d', address, port);
// });