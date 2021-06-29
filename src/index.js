const parser = require("@babel/parser");
const tarverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  //TODO:参数处理
  let hashName = loaderUtils.interpolateName(this, "[hash:8]", {
    context: this.rootContext,
    content: source,
  });
  const tcName = `tc${hashName}`;
  let ast = parser.parse(source, {
    sourceType: "module",
  });
  const tcStatement = `function ${tcName}(promise) {
    return promise.then((data) => [null, data]).catch((error) => [error, null]);
  }`;
  const tcAst = parser.parse(tcStatement);
  const tcExperssion = tcAst.program.body[0];
  tarverse(ast, {
    Program(path) {
      const rootPath = path;
      let hasTcExperssion = false;
      path.traverse({
        AwaitExpression(path) {
          if (!hasTcExperssion) {
            rootPath.unshiftContainer("body", tcExperssion);
            hasTcExperssion = true;
          }
          const node = path.node;
          const awaitCallExpression = node.argument;
          node.argument = t.callExpression(t.identifier(tcName), [
            awaitCallExpression,
          ]);
        },
      });
    },
  });
  const newContent = generate(ast, {});
  return newContent.code;
};
