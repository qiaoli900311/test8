export const CONSUMER_PHONE = '95026'
export const RESERVATION_PHONE = '95026'
export const ERROR_MSG = '服务器繁忙，请稍后再试'

// 支付proxy路径
export const PAYMENT_PROXY_URL = '/showyu-pay-center'

/**
 * 用户类型
 */
export const USER_TYPES = {
  MEMBER: 'member', // 注册会员
  VISITOR: 'visitor' // 游客
}

/**
 * 缓存Keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'user_token',
  USER_ID: 'userId'
}

/**
 * 会员等级及折扣
 */
export const LIVE = [
  {level: 1, name: '银卡会员', sale: 1},
  {level: 3, name: '金卡会员', sale: 0.9},
  {level: 4, name: '白金卡会员', sale: 0.85}
]

export const RECEIVE_ADDRESS_DEFAULT_TYPE = {
  DEFAULT: 'default',
  NOT_DEFAULT: 'notDefault'
}

/**
 * 邀请有礼活动分享参数：活动标识
 * @tips 后台约定，上线前需确认
 */
export const ACT_INVITE_TYPE = {
  MASK: '2',
  GIFT: '3'
}

/**
 * 邀请有礼活动分享参数：用户类型
 * @tips 后台约定，上线前需确认
 */
export const ACT_INVITE_USER = {
  NEW: 'new',
  OLD: 'old'
}

/**
 * 邀请有礼活动分享参数：活动标识
 * @tips 后台约定，上线前需确认
 */
export const ACT_INVITE_ACTIVITY_TYPE = {
  MASK: 1,
  GIFT_A: 2,
  GIFT_B: 3
}

/**
 * 新用户错误参数：新用户标识
 * @tips 后台约定，上线前需确认
 */
export const ACT_USER_CODE = {
  OK: '0',
  NEW_USER: '20003'
}

// 支付结果文案
export const PAYMENT = {
  success: {
    title: '支付成功',
    desc: '订单已完成',
    icon: 'iconchenggong',
    buttons: [
      {
        text: '查看订单信息',
        type: 'primary',
        plain: false,
        hairline: false,
        handleClick: 'checkOrder'
      },
      {
        text: '去购物',
        type: 'default',
        plain: true,
        hairline: true,
        handleClick: 'goShopping'
      }
    ]
  },
  failed: {
    title: '支付失败',
    desc: '支付失败，30分钟后订单自动取消，请及时支付',
    icon: 'iconshibai',
    buttons: [
      {
        text: '继续支付',
        type: 'primary',
        plain: false,
        hairline: false,
        handleClick: 'payContinue'
      },
      {
        text: '暂不支付',
        type: 'default',
        plain: true,
        hairline: true,
        handleClick: 'payPause'
      }
    ]
  }
}

// 9.9面膜邮费
export const PRE_SET_FREIGHT = 5
