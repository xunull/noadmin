var path = require('path')
var webpack = require('webpack')

module.exports = {
    watch: true,
    // entry point of our application
    entry: './front.src/public/js/main.js',
    // where to place the compiled bundle
    output: {
        path: './dist/js',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                // exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    "presets": [
                        'es2015', 'es2017', 'stage-0'
                    ],
                    "plugins": ['transform-runtime']
                }
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules' //添加对样式表的处理
            }, {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url?limit=10000'
            }, {
                test: /\.(eot|woff|woff2|svg|ttf)(\?.*)$/,
                loader: "file-loader"
            }
        ]
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({minimize: true})
    ])
}
