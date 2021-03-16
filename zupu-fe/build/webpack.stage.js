const { resolve } = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const prodConfig = {
  mode: "production",
  output: {
    path: resolve(__dirname, "..", "stage"),
    filename: "js/[name]_[contenthash:5].js",
    chunkFilename: "js/[name]_[id]_[contenthash:5].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "..", "public/index.html"),
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      // 配置样式文件抽离插件
      filename: "styles/[name].[contenthash:5].css",
      chunkFilename: "styles/[name]_[id].[contenthash:5].css",
      ignoreOrder: true,
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: "js/[base].gz",
    }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
  },
  optimization: {
    minimize: true,
  },
};

module.exports = merge(baseConfig, prodConfig);
