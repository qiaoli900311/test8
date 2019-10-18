const weChatAuthUrl = (appId, redirectUrl, scope = 'userinfo') =>
  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_${scope}&state=STATE#wechat_redirect`

// 跳转到微信授权
function wechatLogin(redirectUrl, appId = process.env.wechatAppId, scope) {
  if (!appId) return console.error('requried an appId, but not found')

  redirectUrl = encodeURIComponent(redirectUrl)
  location.replace(weChatAuthUrl(appId, redirectUrl))
}

const AUTHED = 'htua'
const DEFINE_DELIMITER = ','

function wechatGetCode(appId = process.env.wechatAppId, scope) {
  // url ==> https://deepexi/wechat?auth=1&somequery=2#/

  // https://deepexi/wechat
  let redirectUrl = location.origin + location.pathname

  // ?htua=1,somequery=2
  let query = location.search
    .replace('auth', AUTHED)
    .replace(/&/g, DEFINE_DELIMITER)

  // https://deepexi/wechat?htua=1,somequery=2
  wechatLogin(redirectUrl + query, appId, scope)

  // 微信授权重定向回来后 https://deepexi/wechat?htua=1,somequery=2&code=${code}&state=${state}
}

export {AUTHED, DEFINE_DELIMITER, wechatGetCode}
