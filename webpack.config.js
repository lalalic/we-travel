const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {ContextReplacementPlugin} = require("webpack")
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackHarddiskPlugin=require('html-webpack-harddisk-plugin')

const HTML={
	template:'./node_modules/qili-app/dist/index.tmpl',
	title:"在路上",
	favicon: "./dist/favicon.ico",
}

module.exports=env=>{
	const base={
		entry:{
			index:["babel-polyfill","./style/index.less","./src/index.js"]
		},
		output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'dist')
		},
		devtool:false,
		module:{
			rules:[{
				test: /.js?$/,
				use: ['react-hot-loader','babel-loader'],
				include: a=>a.indexOf("node_modules")==-1 ||
					/node_modules[\\\/](qili-app|docx4js|docx-template)[\\\/]src/.test(a),
			},{
				test:/.less?$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'less-loader'
				]
			},{
				test:/.css?$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } }
				]
			},{
				test:/.graphql?$/,
				use: 'text-loader'
			}]
		},
		node:{
			fs: "empty",
			net: "empty",
			module: "empty"
		},
		plugins:[
			new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),
			new HtmlWebpackPlugin({
				...HTML,
				inlineSource: '.(js|css)$'
			}),

			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				filename:"cordova.html",
			}),

			new HtmlWebpackInlineSourcePlugin(),
		]
	}

	if(env){
		return require(`./webpack.${env}.js`)(base,HTML,9083)
	}

	return base
}
