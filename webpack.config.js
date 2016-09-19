module.exports = {
  watch:true,
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
    loaders: [
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue'   // loader to use for matched files
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      }
    ]
  },
  babel: {
   // enable stage 0 babel transforms.
   presets: ['es2015', 'stage-0'],
   plugins: ['transform-runtime']
 }
}
