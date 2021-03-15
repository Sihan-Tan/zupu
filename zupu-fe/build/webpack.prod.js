const { resolve } = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const prodConfig = {
  mode: "production",
  output: {
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        resolve(__dirname, "..", "dist/assets"),
        resolve(__dirname, "..", "dist/views"),
      ],
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: "scripts/[base].gz",
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "..", "public/index.html"),
      filename: "../index.html",
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
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 是否并行打包
      }),
    ],
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "async",
      minChunks: 1, //最少引入了1次
      // maxAsyncRequest: 5,
      // maxInternalRequest: 3,
      name: false,
      //分割代码块
      cacheGroups: {
        // vendor: {
        //   //第三方依赖
        //   priority: 1, //设置优先级，首先抽离第三方模块
        //   name: "vendor",
        //   test: /node_modules/,
        //   chunks: "initial",
        //   maxSize: 30000,
        //   minSize: 10000,
        //   minChunks: 1, //最少引入了1次
        // },
        //缓存组
        common: {
          //公共模块
          chunks: "initial",
          name: "common",
          maxInitialRequests: 5,
          // minSize: 0, //大小超过100个字节
          minChunks: 2, //最少引入了3次
        },
      },
      minSize: {
        javascript: 10000,
        style: 10000,
      },
      maxSize: {
        javascript: 30000,
        style: 30000,
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
