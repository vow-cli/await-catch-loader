/*
 * @Author: genfa.zeng
 * @Date: 2021-06-28 22:51:19
 * @Description:
 */
async function asyncTestFun() {
  const res = await Promise.resolve("success");
  console.log(res);
}

asyncTestFun();
