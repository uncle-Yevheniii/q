const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.jsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
      publicPath: "/", // Додаємо publicPath
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[path][name]__[local]",
                },
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: [".jsx", ".js"],
    },

    devtool: "inline-source-map",

    devServer: {
      static: {
        directory: path.join(__dirname, "public"), // Змінено на public
      },
      historyApiFallback: true,
      port: env.port ?? 3000,
      open: true,
      hot: true,
      compress: true,
    },
  };
};
