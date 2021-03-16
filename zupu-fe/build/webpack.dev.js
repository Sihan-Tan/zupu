const { resolve } = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: resolve(__dirname, "..", "dist/assets"),
    filename: "scripts/[name]_[contenthash:5].js",
    publicPath: "/",
    assetModuleFilename: "scripts/[name].[contenthash:5].[ext]",
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    quiet: true,
    contentBase: resolve(__dirname, "..", "dist"),
    port: 8989,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^/api": "/api" },
      },
    },
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve(__dirname, '..', '.cache'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "..", "public/index.html"),
      filename: "index.html",
    }),
  ],
};

module.exports = merge(baseConfig, devConfig);
