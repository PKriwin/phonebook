const path = require('path')

module.exports = {
  entry: [path.resolve(__dirname, 'js', 'index.js')],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },{
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loaders: ['url-loader']
      },{
         test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
         loaders: ['url-loader']
      },{
         test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
         loader: ['url-loader']
      },{
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: ['url-loader']
      }
    ]
  }
}
