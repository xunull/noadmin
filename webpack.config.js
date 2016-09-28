module.exports = {
    watch: true,
    // entry point of our application
    entry: './front.src/public/js/main.js',
    // where to place the compiled bundle
    output: {
        path: './dist/js',
        filename: 'build.js'
    },
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [{
            test: /\.vue$/,
            loader: 'vue',
        },
        {
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel',
            query: {
                "presets": ['es2015', 'stage-0'],
                "plugins": ['transform-runtime']
            }
        },{
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'url?limit=10000&name=img/[name].[ext]'
        }
        ]
    }
}
