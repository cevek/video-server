var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: [
        './a.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    module: {
        loaders: [
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg)/,
                loader: "url?limit=10"
            }
        ]
    },
    devtool: 'inline-source-map'
};
