 const path = require('path');
module.exports = {
  mode: 'development',
	entry: [
		'@babel/polyfill',
		'./index.js'
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
      },
      {
        test: /test\.js$/,
        use: 'mochapack',
        exclude: /node_modules/,
      }
		]
	},
	plugins: [
	]
};