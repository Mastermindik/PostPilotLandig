import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// типи для девсервера, не видаляти!!
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

interface EnvVariables {
  mode?: "production" | "development";
}

export default (env: EnvVariables): webpack.Configuration => {
  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
      path: path.resolve(__dirname, "dist"),
      clean: true,
      filename: "[name].[contenthash].js",
      assetModuleFilename: "assets/[name].[ext]",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            env.mode === "development"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "inline-source-map",
    devServer: {
      port: 5000,
      open: true,
    },
  };
};

// export default config;
