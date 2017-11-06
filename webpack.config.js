const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
	entry: "./src/app.js",
    output: {
    	path: path.resolve( __dirname, 'assets' ),
        filename: 'js/script.js'
    },
    module: {
        loaders: [
            {
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
					  	presets: ['babel-preset-es2015']
					}
				}
            },
            {
                test: /\.css$/,
				use: [ "style-loader", "css-loader", "postcss-loader" ]
		       
            },
            {
                test: /\.(scss|sass)$/,
		        use: ExtractTextPlugin.extract({
		          	fallback: 'style-loader',
		          	use: [ "css-loader", "postcss-loader", "sass-loader" ]
		        })
            },
		    {
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
					  loader: 'file-loader',
					  options: {
					    name: '[name].[ext]',
					    outputPath: 'images/'
					  }  
					},
					{
						loader: 'img-loader',
						options: {
			              mozjpeg: {
			                quality: 80
			              },
						}
					}
					
				]
		    },
			{
				test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: '10000',
         					name: 'fonts/[name].[ext]' 
						}  
					},

				]
			}

        ]
    },
	plugins: [
		new ExtractTextPlugin('css/style.css'),
		new webpack.ProvidePlugin({
		  $: 'jquery',
		  jQuery: 'jquery'
		})
	]
};