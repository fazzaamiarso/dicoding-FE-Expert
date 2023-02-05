import common from "./webpack.common";
import { merge } from "webpack-merge";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [],
  },
});
