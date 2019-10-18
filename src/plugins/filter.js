/**
 * Created by levy on 2018/8/15.
 */
// 这里编写全局注册的filter
import Vue from 'vue'
import {isNull} from '@/utils'

import dayjs from 'dayjs'

// 千分位分隔符表示价格
// 123456 => 123,456
function price(val, cancelFixed) {
  if (isNull(val) || isNaN(val)) return
  let USPrice = Number.parseFloat(val).toLocaleString()

  let lastDot = USPrice.toString().indexOf('.')
  // 完全是整数, 需要添加小数点
  if (lastDot === -1 && !cancelFixed) USPrice += '.00'

  // 返回数据是一位小数，用0补齐为两位小数
  if (USPrice.toString().substring(lastDot + 1).length === 1 && !cancelFixed)
    USPrice += '0'

  return '¥ ' + USPrice
}

// 时间戳格式化
function formatDateTime(value, format = 'YYYY.MM.DD') {
  return dayjs(value).isValid() ? dayjs(value).format(format) : value
}

Vue.filter('price', price)
Vue.filter('formatDateTime', formatDateTime)
