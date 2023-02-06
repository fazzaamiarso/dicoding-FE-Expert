import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import path from "path";
import common from "./webpack.common";

const devServer: DevServerConfiguration = {
  static: path.resolve(__dirname, "dist"),
  open: true,
  port: 9000,
  client: {
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  hot: true,
  compress: true,
};

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer,
});
