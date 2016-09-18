module.exports = {
  // entry point of our application
  entry: './front.src/public/js/main.js',
  // where to place the compiled bundle
  output: {
    path: './dist',
    filename: 'js/build.js'
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
        loader:'babel',
        exclude:/node_modules/
      }
    ]
  },
  babel: {
   // enable stage 0 babel transforms.
   presets: ['es2015', 'stage-0'],
   plugins: ['transform-runtime']
 }
}
