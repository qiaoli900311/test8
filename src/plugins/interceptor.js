/**
 * 全局路由拦截
 */
export default function({app, store, isDev}) {
  const REGISTER_PAGE = '/register' // 认证跳转登录注册页

  /**
   * 前置拦截
   *
   */
  app.router.beforeEach((to, from, next) => {
    app.$toast.clear(true)
    // 跳过空白页
    if (to.path === REGISTER_PAGE) return next()

    // do something
    next()
  })

  /**
   * 后置拦截
   *
   */
  app.router.afterEach(async (to, from) => {
    if (to.path === REGISTER_PAGE) return
    // do something
  })
}
