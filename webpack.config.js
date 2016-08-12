module.exports = {
  // watch 在webpack 中没有找到, 不过同样能用
  watch: true,
  entry: './public/js/index.jsx',
  output: {
    // 如果使用gulp 有path 参数会报错
    // path: './dist',
    filename: 'js/index.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['jsx?harmony']
    }]
  },
  devtool: 'source-map'
};
