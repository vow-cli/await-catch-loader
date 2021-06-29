# await-catch-loader

能够自动处理`await`异常的`webpack-loader`

## 简介

`Async/await`是`ES7`的新特性，它允许开发者编写异步代码像同步代码一样，它本质上是`generator`生成器和`promise`的语法糖。

虽然它带来了很大的便利性，但是`async/await`中错误的处理是一个十分头痛的问题,当`async`中产生异常时，比如:`HTTP`请求错误，操作文件产生异常，它会抛出异常而不是内部消化这个异常，为了保证程序的正常执行,十分普遍的做法是在`async`函数中使用`try/catch`来捕获这些错误。比如：

```javascript
async function asyncFunc() {
  try {
    const product = await Api.product({ id: 10 });
    if (!product) {
      console.log("No product found");
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const saveProduct = await Api.save({
      id: product.id,
      name: product.name,
    });
  } catch (err) {
    console.log(err);
  }
}
```

这会导致代码十分的零散,代码不够简约,除了这种方式,当然你可以将错误一致抛出全局，在全局做统一处理也是可以的,但是也有非常多的场景下是要在函数内部做判断的，于是产生了一种更加优雅的处理方式:

由于`await`后面的代码块通常是`promise`，可以自己先去处理该`promise`的异常，这样就不会抛出错误了,原理如下:

```javascript
function tc(promise) {
  return promise.then((data) => [null, data]).catch((error) => [error, null]);
}

const [error, data] = await tc(Api.product({ id: 10 }));
if (!data) {
  console.log("No product found");
}

const [error, data] = await tc(
  Api.save({
    id: product.id,
    name: product.name,
  })
);
```

但是如果每次在写代码时，都要去引用`tc`函数并且将`await`后的表达式包裹进去，也是十分繁琐的，于是就写了这样的一个`webpack-loader`自动实现该过程。

## 原理

该`loader`内部是基于`@babel/parse`,`@babel/traverse`来实现的，本质上是通过`babel`编译源代码后的`AST`转换得来

## 安装

```shell
npm install @vow-cli/await-catch-loader -D`
```

## 使用

`webpack` 中

```javascript
//webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: "await-catch-loader",
      },
    },
  ];
}
```

在 `vue-cli` 创建的项目中:

```javascript
//vue.config.js
module.exports = {
   config.module
      .rule("js")
      .test(/\.js$/)
      .use("@vow-cli/await-catch-loader")
      .loader("@vow-cli/await-catch-loader")
      .end();
}
```

注意该`loader`的执行时机要位于`babel-loader`之前，因为`babel-loader`会将`async/await`做二次转译

### 后续

对`await`做更加精细化的处理，目前所有包含`await`的代码都会自动加上处理函数，比较暴力;可以创建一个新的语法叫做`tcAwait`
