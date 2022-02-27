/* eslint-disable no-useless-concat */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable prefer-template */
/* eslint-disable no-var */
;(function (root) {
  var default_numbers = ' hai ba bốn năm sáu bảy tám chín'
  var currency = 'đồng'
  var units = ('1 một' + default_numbers).split(' ')
  var ch = 'lẻ mười' + default_numbers
  var tr = 'không một' + default_numbers
  var tram = tr.split(' ')
  var u = '2 nghìn triệu tỉ'.split(' ')
  var chuc = ch.split(' ')
  function tenth(a) {
    var sl1 = units[a[1]]
    var sl2 = chuc[a[0]]
    var append = ''
    if (a[0] > 0 && a[1] == 5) sl1 = 'lăm'
    if (a[0] > 1) {
      append = ' mươi'
      if (a[1] == 1) sl1 = ' mốt'
    }
    var str = sl2 + '' + append + ' ' + sl1
    return str
  }
  function block_of_three(d) {
    _a = d + ''
    if (d == '000') return ''
    switch (_a.length) {
      case 0:
        return ''
      case 1:
        return units[_a]
      case 2:
        return tenth(_a)
      case 3:
        sl12 = ''
        if (_a.slice(1, 3) != '00') sl12 = tenth(_a.slice(1, 3))
        sl3 = tram[_a[0]] + ' trăm'
        return sl3 + ' ' + sl12
    }
  }
  function formatnumber(nStr) {
    nStr += ''
    var x = nStr.split('.')
    var x1 = x[0]
    var x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
  }
  root.to_vietnamese = function (str) {
    var str = parseInt(str) + ''
    var i = 0,
      j = 3
    var arr = []
    var index = str.length
    if (index == 0 || str == 'NaN') return ''
    var string = ''
    while (index >= 0) {
      arr.push(str.substring(index, Math.max(index - 3, 0)))
      index -= 3
    }
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != '' && arr[i] != '000')
        string += ' ' + block_of_three(arr[i]) + ' ' + u[i]
    }
    return string.replace(/[0-9]/g, '').replace(/  /g, ' ') + ' ' + currency
  }
})(window)
