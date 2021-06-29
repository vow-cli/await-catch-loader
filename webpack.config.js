const path = require("path");
module.exports = {
  mode: "development",
  entry: "./test/example.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: [path.resolve(__dirname, "./src/index.js")],
      },
    ],
  },
};
