/*
 * @Author: genfa.zeng
 * @Date: 2021-06-28 22:49:52
 * @Description: asyncCatchLoader入口文件
 */
const parser = require("@babel/parser");
const tarverse = require("@babel/traverse").default;
// const t = require("@babel/types");
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  //参数
  let options = loaderUtils.getOptions(this);
  console.log(options);
  //源代码转ast
  let ast = parser.parse(source, {
    sourceType: "module",
  });
  tarverse(ast, {
    AwaitExpression(path) {
      console.log(path);
    },
  });
  return source;
};
