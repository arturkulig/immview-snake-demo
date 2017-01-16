const path = require('path');

module.exports = {
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
    }
};
