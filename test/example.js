async function asyncTestFun() {
  const [error1, data1] = await Promise.resolve("success");
  const [error2, data2] = await Promise.reject("error");
  console.log(error1, data1);
  console.log(error2, data2);
}

asyncTestFun();
