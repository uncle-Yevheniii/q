export interface BuildPath {
  entry: string;
  html: string;
  output: string;
}

export type BuildMode = "production" | "development";

export interface BuildOptions {
  port: number;
  configPaths: BuildPath;
  mode: BuildMode;
}
