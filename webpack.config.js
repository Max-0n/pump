const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    app: './src/app.ts'
  },
  output: {
    filename: "[name].[hash].bundle.js",
    path: path.resolve(__dirname, 'docs')
  },
  devServer: {
    port: 3000,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader?pretty=true',
        ]
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg|mp3)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]'
        }
      },
      {
        test : /.css$|.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {}
  if (argv.mode === 'production') {
    // config.plugins[1] = new HtmlWebpackPlugin({ template: './src/index.pug', inject: false });
  }
  return config;
}
