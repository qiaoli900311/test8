import cookie from 'js-cookie'
import {STORAGE_KEYS} from '@/const/common'

export default function(context) {
  let {$axios, store, app} = context

  /**
   * 清理Cookie,重新认证
   */
  function reloadToken() {
    // const options = {path: app.router.options.base}
    // const domain = '.' + location.host
    // cookie.remove(STORAGE_KEYS.TOKEN, {domain, path: '/'})
    // cookie.remove(STORAGE_KEYS.TOKEN, options) // Fixed: DEV
    // cookie.remove('userId', options)
    // cookie.remove('tenantId', options)
    // location.reload()
  }

  $axios.onRequest(config => {
    let url = config.url

    // const token = cookie.get(STORAGE_KEYS.TOKEN) || store.state.token
    // jwt 验证
    // if (token) {
    //   config.headers.common['Authorization'] = `Bearer ${token}`
    // } else {
    //   // 无Token情况处理
    //   // reloadToken()
    // }

    // url += url.indexOf('?') > -1 ? '&' : '?'
    // url += `tenantId=${store.state.tenantId}&userId=${
    //   store.state.userId
    // }&_=${new Date().getTime()}`

    config.url = url

    return config
  })

  $axios.onResponse(response => {
    try {
      // TIPS 预留错误处理，接口待统一
      response.data.code === '803' && reloadToken()
    } catch (e) {
      // do nothing
    }

    return response
  })

  $axios.onError(error => {
    if (process.client) {
      try {
        error.response.status == 401 && reloadToken()
      } catch (e) {
        // do nothing
      }
    }
    // TODO asyncData 的错误 需要日志监控
    else console.log('error', error)
  })
}
