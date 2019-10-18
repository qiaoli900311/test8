/**
 * 需要使用 layout/default 但又不想展示头部的返回操作栏时使用 请将路由名字加入到数组中，并注明什么页面
 *
 * 比如需要keepAlive的路由地址如下
 * @param {String} path "/article/detail/:id"
 * 那么需要加入数组的路由名字为
 * @param {String} name "article-detail-id"
 *
 * 具体 路径 => 名字 规则
 * https://nuxtjs.org/guide/routing#basic-routes
 */

export default [
  // 订单详情
  'order-detail'
]
