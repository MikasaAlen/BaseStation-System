import Vue from 'vue'
let filter = function () {
  // 日期格式化
  Vue.filter('formDate', function (value) {
    let locale = undefined
    if (!new Date(value).getDate()) {
      locale = new Date(JSON.parse(value)).toLocaleString()
    } else {
      locale = new Date(value).toLocaleString()
    }
    let array = locale.split(' ')[0].split('/')
    let date = new Date(value)
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return array.join('-') + ' ' + hour + ':' + minute
  })
  // 如果一个字符串为空，则用省略号代替；如果太长，则通过设置keep值，保留需要的长度，剩余部分用省略号代替
  Vue.filter('cutString', function (value, keep) {
    if (!value) {
      return '-----'
    }
    if (!keep) {
      keep = 20
    }
    let cuttedString = value.substr(0, keep)
    if (cuttedString !== value) {
      cuttedString += '...'
    }
    return cuttedString
  })
  // 时间格式
  Vue.filter('formatTime', function (value) {
    if (!value) {
      return '-----'
    }
    let date = new Date(value)
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return hour + ':' + minute
  })
  // 日期格式
  Vue.filter('formatDate', function (value) {
    if (!value) {
      return '-----'
    }
    let locale = new Date(value).toLocaleString()
    let array = locale.split(' ')[0].split('/')
    if (array[1] < 10) {
      array[1] = '0' + array[1]
    } if (array[2] < 10) {
      array[2] = '0' + array[2]
    }
    return array.join('/')
  })
  Vue.filter('computeResultFilter', function (value, unit) {
    if (!value && value !== 0) {
      return '-----'
    }
    else {
      value = value.toString()
      var first_str = value.slice(0,1)
      var str = value.slice(1)
      if(first_str==='<')
        return first_str + Number(str).toFixed(2) + unit
      else
        return Number(value).toFixed(2) + unit
    }
  })
}
export default filter
