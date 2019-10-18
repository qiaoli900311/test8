import Vue from 'vue'
import {ticket_key, wxSDK} from '@/utils/jssdk.js'
import {wxAuth} from '@/const/api'
import routesNeedShareMenu from '@/const/shareableRoutes.js'

const API_SERVER = process.env.apiServer || ''

/**
 * jsApiTicket地址
 */
const jsApiTicket =
  process.env.WECHAT_CENTER ||
  `${API_SERVER}/wx/api/v1/mp/js_ticket?account=${process.env.wechatAccount}`

/**
 * 微信环境
 *
 * @returns {Boolean}
 */
export const isWeChat = () => /MicroMessenger/i.test(navigator.userAgent)

/**
 * 微信授权调用方法
 *
 * @param {object} [opts={
 * url  : location.href,           授权后需要重定向的页面，默认当前页面
 * appId: process.env.wechatAppId, 服务号appId 默认从环境变量获取
 * scope: "snsapi_userinfo",       授权方式 默认强授权
 * state: "",                      授权场景 用来区分不同的授权场景，暂时没用
 * api  : wxAuth,                  授权接口 需要带有协议和域名的完整接口
 * }]
 */
export function auth(
  opts = {
    url: location.href,
    appId: process.env.wechatAppId,
    scope: 'snsapi_userinfo',
    state: '',
    api: wxAuth
  }
) {
  let url = encodeURIComponent(opts.url)
  // TODO: 微信授权登录接口
  let redirectUri = `${API_SERVER}${opts.api}?tenantId=showyu&referer=${url}`
  redirectUri = encodeURIComponent(redirectUri)
  location.replace(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      opts.appId
    }&redirect_uri=${redirectUri}&response_type=code&scope=${
      opts.scope
    }&state=${opts.state}#wechat_redirect`
  )
}

/**
 * 初始化JSSDK
 *
 * @params {Vue} app
 * @params {*} route 当前路由
 */
export async function initSDK(app, route) {
  let ticket = sessionStorage.getItem(ticket_key)

  try {
    if (!ticket) {
      let resp = await app.$axios.$get(jsApiTicket)
      ticket = resp.payload

      sessionStorage.setItem(ticket_key, ticket)
    }

    const baseConfig = {
      appId: process.env.wechatAppId,
      ticket,
      // 新增需要使用的wx sdk
      jsApiList: [
        'hideAllNonBaseMenuItem',
        'showMenuItems',
        'scanQRCode',
        'chooseWXPay',
        'closeWindow',
        // 这两个接口即将被微信团队废弃
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
        //  这两个接口代替旧的分享文案接口，需要jssdkv1.4.0， 现版本v1.2.0
        // "updateAppMessageShareData",
        // "updateTimelineShareData"
      ]
    }

    const wechat = new wxSDK(baseConfig)

    // 隐藏 菜单按钮
    const hideAllBaseMenuItem = () => wx.hideAllNonBaseMenuItem()

    const showShareMenu = list => () => {
      if (list.indexOf(route.name) > -1) {
        wx.showMenuItems({
          menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
        })
      }
    }

    // 需要在 wx.ready 后调用的接口请在这里注册
    wechat.registerReady([
      // 数组的元素需要返回一个函数
      hideAllBaseMenuItem,
      showShareMenu(routesNeedShareMenu)
    ])

    // 提交wx.config和注入需要在ready后执行的函数
    wechat.on()
  } catch (e) {
    console.error('wechat sdk config error : ', e)
  }
}

// export plugin
Vue.prototype.$wechat || (Vue.prototype.$wechat = {})
Vue.prototype.$wechat.auth = auth
Vue.prototype.$wechat.initSDK = initSDK
Vue.prototype.$wechat.isWeChat = isWeChat
