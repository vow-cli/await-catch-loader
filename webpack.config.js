/*
 * @Author: genfa.zeng
 * @Date: 2021-06-28 22:52:19
 * @Description:
 */
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: [path.resolve(__dirname, "./loaders/asyncCatchLoader.js")],
      },
    ],
  },
};
