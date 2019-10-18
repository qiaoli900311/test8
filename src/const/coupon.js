export const couponStatus = {
  unused: 'unused',
  notActive: 'notActive',
  used: 'used',
  expried: 'expried',

  // 后台mock接口
  stay_valid: 'stay_valid', //未生效
  wait_use: 'wait_use', //待使用
  then_use: 'then_use', //已使用
  then_expire: 'then_expire' //已失效
}

export const reduceType = {
  discount: 'discount', //折扣券
  subtract_arrive: 'subtract_arrive', //减到(必定不能叠加)
  lapse: 'lapse' //直减(可以叠加)
}
