export const ALL_STATUS = {
  ALL: '', //全部
  PRE: 1, //"预生成"
  CREATE: 2, //"待付款"
  UNFINISHED: 3, //"未完成"
  FINISHED: -1, //"已付款"
  NOT_SEND: 101, //"待发货"
  SEND: 102, //"待收货"
  RECEIVED: 103, //"已收货"
  NOT_EXTRACT: 201, //"未提取"
  EXTRACTING: 202, //"提取中"
  EXTRACTED: 203, //"已提取"
  AFTER_SELL: 5 //售后
}

// tab展示的列表
export const TAB_LIST = {
  '0': '全部',
  '1': '待付款',
  '2': '已付款'
}

// 对应订单列表tab index
export const STATUS_OBJ = {
  '0': ALL_STATUS.ALL,
  '1': ALL_STATUS.CREATE,
  '2': ALL_STATUS.FINISHED
}

// 状态码对应的释义
// export const ORDER_STATUS = {
//   '1': '预生成',
//   '2': '待付款',
//   '3': '已关闭',
//   '4': '已完成',
//   '101': '待发货',
//   '102': '待收货',
//   '201': '待预约',
//   '202': '预约中',
//   '203': '已预约',
//   '-1': '已付款'
// }
export const ORDER_STATUS = {
  0: '已支付',
  1: '已发货',
  2: '已完成'
}

// 状态码对应的按钮文案
export const BUTTON_TYPE = {
  // '1': '立即查看',
  '2': '立即付款',
  '4': '立即评价',
  // '102': '查看物流',
  '201': '立即预约',
  default: '立即查看',
  getText(status) {
    return this[status] || this.default
  }
}

// 主订单类型
export const ORDER_TYPE = {
  MERGE: 1, // 组合商品
  PRODUCT: 2, //仅货物
  SERVICE: 3, //仅服务
  SPREAD: 4 //补差价订单
}

// 子订单类型 / 商品类型
export const PRODUCT_TYPE = {
  SERVICE: 1, //服务订单
  PRODUCT: 2 //货物订单
}
