module.exports = {
    entry: {
        'index': './src/index.js',
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.coffee$/,
            loader: 'coffee-loader'
        }, {
            test: /\.css$/,
            loader: "css-loader"
        }]
    }
};
