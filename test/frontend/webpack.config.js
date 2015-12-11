var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: __dirname,
    entry: {
        app: './src/app.tsx'
    },
    output: {
        path: 'build',
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")}
        ]
    },
    resolve: {
        alias: {
            //react: 'fast-react'
        },
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },
    stats: {
        children: false
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    devtool: 'inline-source-map'
};
