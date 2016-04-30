var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: __dirname,
    entry: [
        // 'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        './src/app.tsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [/*'react-hot', */'ts-loader'],
                // include: __dirname

            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)/,
                loader: "url?limit=100000"
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")}
        ]
    },
    resolve: {
        alias: {
            react: 'fast-react',
            'react-dom': 'fast-react'
        },
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },
    stats: {
        children: false
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("styles.css")
    ],
    devtool: 'inline-source-map'
};
