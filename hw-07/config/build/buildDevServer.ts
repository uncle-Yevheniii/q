import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    static: { directory: options.configPaths.html },
    compress: true,
    port: options.port ?? 8080,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
