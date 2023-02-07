import common from "./webpack.common";
import { merge } from "webpack-merge";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [],
  },
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "./sw.bundle.js",
    }),
  ],
});
