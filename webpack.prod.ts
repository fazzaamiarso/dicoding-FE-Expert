import common from "./webpack.common";
import { merge } from "webpack-merge";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import path from "path";

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
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, "src/utils/sw/sw.ts"),
      swDest: "./sw.bundle.js",
    }),
  ],
});
