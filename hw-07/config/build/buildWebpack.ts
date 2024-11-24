import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, configPaths } = options;

  return {
    mode: mode ?? "development",
    entry: configPaths.entry,
    output: {
      path: configPaths.output,
      filename: "[name].[contenthash].js",
      clean: true,
      publicPath: "/",
    },
    plugins: buildPlugins(options),
    module: { rules: buildLoaders(options) },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    devServer: buildDevServer(options),
    devtool: "inline-source-map",
  };
}
