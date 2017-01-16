const path = require('path')

const config = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        port: 8080,
        open: 'http://localhost:8080/',
        contentBase: 'dist'
    },
    plugins: [],
}

if (process.env.NODE_ENV === 'production') {
    const webpack = require('webpack')
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true,
            warnings: false
        }
    }))
}

module.exports = config 
