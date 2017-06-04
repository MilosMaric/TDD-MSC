var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './App.js',
    devtool: 'eval',
    output: {
        path: './publish/',
        exclude: "./node_modules/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] }},
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ]
    },
    plugins: [
      new LiveReloadPlugin()
    ]
};
