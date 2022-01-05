const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

// const isProd = process.env === 'production'

/* helper function to get into build directory */
function distPath(name) {
  if (undefined === name) {
    return path.join("dist");
  }

  return path.join("dist", name);
}

const webpackConfig = {
  target: "node",
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  watch: true, // TODO

  performance: {
    hints: false,
  },

  entry: "./src/index.ts",

  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },

  resolve: {
    alias: {
      moment$: "moment/moment.js",
    },
    extensions: [".ts", ".js"],
    modules: ["node_modules", "src"],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        test: /\.ts$/,
        ts: {
          compiler: "typescript",
          configFileName: "tsconfig.json",
        },
      },
    }),
    // optimize moment.js
    // @see: https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // new webpack.ContextReplacementPlugin(
    //   /moment[\/\\]locale$/,
    //   // /^\.\/(en|zh-cn)$/
    //   /zh-cn/
    // )
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin({ resourceRegExp: /moment\/locale\// }),
  ],

  module: {
    // noParse: [/static/],
    rules: [
      {
        test: /\.ts$/,
        exclude: /^\/(node_modules|static)/,
        loader: "ts-loader",
      },
    ],
  },

  externals: [nodeExternals()],
};

module.exports = webpackConfig;
