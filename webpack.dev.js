const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	entry: [
		'webpack-hot-middleware/client?noInfo=true&reload=true&path=//localhost:3000/__webpack_hmr',
	],
	output:{
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'source-map'
});