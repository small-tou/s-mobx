const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        main: './src/s-mobx.js'
    },
    output: {
        path: path.resolve(__dirname, '../release'),
        filename: 's-mobx.min.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [ 'es2015' ],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-class-properties',
                    ],
                    babelrc: false
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};