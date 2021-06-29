const path = require("path");
const webpack = require("webpack");
const Memoryfs = require("memory-fs");
module.exports = (fileName, options) => {
  const compiler = webpack({
    context: __dirname,
    enter: `./${fileName}`,
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: path.resolve(__dirname, "../src/index.js"),
            options,
          },
        },
      ],
    },
  });

  //文件存入内存而不是磁盘
  compiler.outputFileSystem = new Memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};
