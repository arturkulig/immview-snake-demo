var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: __dirname + '/dist',
        //publicPath: __dirname + '/dist',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                },
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        port: 8080,
        open: 'http://localhost:8080/index'
    }
};
