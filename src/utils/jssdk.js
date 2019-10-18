/*
 * @Author: Han
 * @Date: 2019-02-27 17:00:02
 * @Last Modified by: Han
 * @Last Modified time: 2019-03-27 16:39:46
 */

const DEFAULT_JSAPILIST = [
  'hideAllNonBaseMenuItem',
  'showMenuItems',
  'scanQRCode',
  'chooseWXPay',
  'closeWindow',
  'onMenuShareTimeline',
  'onMenuShareAppMessage'
]

const isType = type => value =>
  Object.prototype.toString.call(value) === `[object ${type}]`
const isArray = isType('Array')
const isFunction = isType('Function')

const ticket_key = 'jsapi_ticket'
/**
 * 封装了注入jssdk的相关逻辑
 * TODO: 获取ticket时其实可以把相关config也post到服务的生成直接生成签名，减少前端sha1的依赖
 * @class wxJSSDK
 * @param {object} opts
 * @param {opts} appId 微信公众号appId
 * @param {opts} ticket 微信公众号ticket
 * @param {opts} jsApiList 申请使用的微信jssdk接口列表
 * @param {opts} debug 是否开启debug模式
 */
class wxSDK {
  constructor(opts = {jsApiList: []}) {
    this.appId = opts.appId
    this.ticket = opts.ticket
    // if (!this.appId || !this.ticket) {
    //   console.error("appId or ticket required when injecy weixin jssdk")
    // }
    this.jsApiList = Array.from(
      new Set(DEFAULT_JSAPILIST.concat(opts.jsApiList))
    )
    this.timestamp = opts.timestamp || parseInt(+new Date() / 1000)
    this.nonceStr = opts.nonceStr || 'nonceStr'
    this.url = location.href.indexOf('#')
      ? location.href.split('#')[0]
      : location.href
    this.debug = opts.debug || false
    this.awaitReady = []
    this.signature = opts.signature || ''
    this.signature || this.createSignature()
  }

  createSignature() {
    if (!sha1) return console.error('miss module sha1')
    let str = `${ticket_key}=${this.ticket}&noncestr=${
      this.nonceStr
    }&timestamp=${this.timestamp}&url=${this.url}`
    this.signature = sha1(str)
  }

  // 用于注册ready调用的微信 api
  registerReady(fn) {
    if (isArray(fn)) {
      this.awaitReady = this.awaitReady.concat(fn)
    }

    if (isFunction(fn)) {
      this.awaitReady.push(fn)
    }
  }

  config() {
    wx.config({
      debug: this.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: this.appId, // 必填，公众号的唯一标识
      timestamp: this.timestamp, // 必填，生成签名的时间戳
      nonceStr: this.nonceStr, // 必填，生成签名的随机串
      signature: this.signature, // 必填，签名，见附录1
      jsApiList: this.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  }

  ready() {
    const {awaitReady} = this
    wx.ready(function() {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
      // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
      // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      // 执行注册的ready后执行的函数
      awaitReady.map(fn => isFunction(fn) && fn())
    })
  }

  // 开始注册微信api，需要将需要的api添加到jsApiList和相应的ready callback后运行
  on() {
    try {
      this.config()
      this.ready()
    } catch (e) {
      console.error('wechat sdk config error : ', e)
    }
  }
}

// export default wxJSSDK
export {wxSDK, ticket_key}
