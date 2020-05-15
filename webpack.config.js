const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, './'),
  // ここがどのscssをみるか
  entry: "./stylesheets/main.scss",
  output: {    
    // どのディレクトリにどんな名前でbuild後のcssを吐くか
    path: path.join(__dirname, ''),
    filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 使用するプラグイン
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      }
    ]
  },
  plugins: [    new ExtractTextPlugin('[name].css')  ]
}
