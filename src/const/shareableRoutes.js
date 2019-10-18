/**
 * 需要开启微信内分享的页面，请将路由名字加入到数组中，并注明什么页面
 *
 * 比如需要分享的路由地址如下
 * @param {String} path "/article/detail/:id"
 * 那么需要加入数组的路由名字为
 * @param {String} name "article-detail-id"
 *
 * 具体 路径 => 名字 规则
 * https://nuxtjs.org/guide/routing#basic-routes
 */

export default [
  // 文章详情
  'article-detail-id',
  // 商城首页
  'index',
  // 商品详情
  'goods-detail'
]
