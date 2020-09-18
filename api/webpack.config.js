const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	optimization: {
		minimize: false
	},
	externals: [nodeExternals()],
	entry: slsw.lib.entries,
	target: 'node',
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	devtool: 'source-map',
	node: {
		__dirname: false,
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}],
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				failOnWarning: true
			}
		}
		]
	},
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
	resolve: {
		alias: {
			'@api': path.resolve(__dirname, 'src'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@models': path.resolve(__dirname, 'src/models'),
			'@routes': path.resolve(__dirname, 'src/routes'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@exceptions': path.resolve(__dirname, 'src/exceptions'),
			'@repositories': path.resolve(__dirname, 'src/repositories'),
		}
	},
};
