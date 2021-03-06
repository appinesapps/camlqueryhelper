const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = merge(common, {
	mode: 'production',
	output:{
		publicPath: '/'
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
	devtool: 'source-map'
});