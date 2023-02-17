import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import path from "path";
import common from "./webpack.common";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

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
  hot: false,
  compress: true,
  historyApiFallback: true,
};

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer,
  plugins: [new CleanWebpackPlugin()],
});
