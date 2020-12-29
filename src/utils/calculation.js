// 求和
const sum = array => {
  let result = 0
  array.forEach(element => {
    result += element
  })
  return result
}
// 求平均值
const mean = array => sum(array) / array.length
// 保留有效数字，默认为两位
const keepDigits = (num, digit = 2) => Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit)
// 计算标准差
const computeStandardDev = (...args) => {
  const M = mean(args)
  const tempArray = args.map(value => {
    return Math.pow(value - M, 2)
  })
  return Math.sqrt(sum(tempArray) / (tempArray.length - 1))
}

const calculation = {
  mean,
  sum,
  keepDigits,
  computeStandardDev
}

export default calculation;
