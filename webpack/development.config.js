const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = process.env.NODE_ENV;
const isDev = env !== 'production';

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },


      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },

      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name(file) {
            if (isDev) {
              return '[path][name].[ext]';
            }

            return '[contenthash].[ext]';
          },
        },
      },

      {
        test: /\.(svg)$/i,
        exclude: /node_modules/,
        loader: 'svg-inline-loader',
      },

    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? 'style.[name].css' : 'style.css',
    }),
    new webpack.DefinePlugin({
      isDev: JSON.stringify(isDev),
    }),

    new webpack.HotModuleReplacementPlugin(),


    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: 'all',
    }),
  ],
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: false,
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },

};
