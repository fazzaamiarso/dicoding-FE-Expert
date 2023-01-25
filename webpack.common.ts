import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.ts"),
    // sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/i,
        exclude: [/\.styles.scss$/],
        use: [
          "style-loader",
          { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
    new ESLintWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

export default config;
