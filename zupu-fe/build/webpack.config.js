const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const notifier = require("node-notifier");

module.exports = {
  mode: "development",
  entry: {
    app: resolve(__dirname, "..", "src/index.tsx"),
  },
  output: {
    path: resolve(__dirname, "..", "dist/assets"),
    filename: "scripts/[name]_[contenthash:5].js",
    // chunkFilename: "scripts/[name]_[id]_[contenthash:5].js",
    assetModuleFilename: "scripts/[name].[contenthash:5].bundle.[ext]",
  },
  experiments: {
    asset: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "..", "src/"),
    },
    extensions: [".ts", ".tsx", ".js", ".mjs", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "eslint-loader",
            options: {
              //自动修复eslint的错误
              fix: true,
            },
          },
          {
            loader: "babel-loader",
          },
        ],
        include: [resolve(__dirname, "../", "src")],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              // importLoaders: 1,
            },
          },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        notes: [
          "Some additionnal notes to be displayed unpon successful compilation",
        ],
        messages: ["You application is running here http://localhost:8989"],
      },
      onErrors: function (severity, errors) {
        if (severity !== "error") {
          return;
        }
        notifier.notify({
          title: "Webpack React",
          message: "Webpack Compile Error",
          icon: "", // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        });
      },
      clearConsole: true,
    }),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      // 配置样式文件抽离插件
      filename: "styles/[name].[contenthash:5].css",
      chunkFilename: "styles/[name]_[id].[contenthash:5].css",
      ignoreOrder: true,
    }),
  ],
};
