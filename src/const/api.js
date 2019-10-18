const version = '/api/v1'
const baseUrl = 'http://47.92.95.20:7001/poc'

/* poc 公共node接口 */
const poc = '/poc' + version
// 更新购物车商品数量
export const setCartGoods = `${poc}/common/update?collection=zhoudafu_cart`

// 商品加入购物车
export const addToCart = `${poc}/common/create?collection=zhoudafu_cart`

// 获取购物车商品
export const getCartGoods = `${poc}/common/list?collection=zhoudafu_cart`

// 登录注册
export const login = `${poc}/common/login`

// 查询用户信息
export const findByID = `${poc}/common/findUserById`

// 新增一条
export const commonCreateOne = collection =>
  `${poc}/common/create?collection=mengniu_${collection}`
// 根据id查看详情
export const commonShowOne = (collection, id, query = {}) =>
  `${poc}/common/show?collection=zhoudafu_${collection}&_id=${id}&query=${JSON.stringify(
    query
  )}`
// 获取指定集合列表
export const commonList = (collection, query = {}) =>
  `${poc}/common/list?collection=zhoudafu_${collection}`

// 更新接口
export const commonUpDate = collection =>
  `${poc}/common/update?collection=mengniu_${collection}`

// 批量删除接口
export const commonDestroy = (collection, ids) =>
  `${poc}/common/destroy?collection=mengniu_${collection}&ids=${ids}`

// 短信及生产订单接口
export const sendMsg = collection =>
  `${poc}/mengniu/sendMsg?collection=mengniu_${collection}`

/* poc 公共node接口 */

// 获取商品列表
export const getGoods = `${baseUrl}${version}/product/findGoodList`

// 查看商品详情
export const getGoodsDetail = `${baseUrl}${version}/common/findOneByCondition?collection=goods`

// 查看商品参阅活动策略
export const getGoodsStrategy = `${baseUrl}${version}/product/findByGoodCode`

// 支付提交订单
export const subOrder = `${baseUrl}${version}/common/addOne?collection=order`

// 下单同步调用接口
export const buy = `${baseUrl}${version}/report/buy`

// 查询订单列表
export const orderList = `${baseUrl}${version}/common/findAllByCondition?collection=order`

// 加入购物车同步调用接口
export const reportAddCart = `${baseUrl}${version}/report/addCart`

// 提交订单时删除购物车商品
export const deleteCartPro = `${baseUrl}${version}/common/deleteCartByCodeArray?collection=cart`

// 删除优惠券接口
export const deleteCouPon = `${baseUrl}${version}/common/deleteCouPon`

const informationCenter = `/showyu-information-center${version}`

// 商品优惠券
const goodsCouponCenter = '/showyu-promotion-center' + version

// 收货地址管理
const addressCenter =
  'http://39.98.50.163:3000/mock/1274/showyu-mobile/mock' + version

// 订单管理
const orderCenter = `/showyu-order-center${version}`

// 商品中心
const productCenter = `/showyu-product-center${version}`

// 商城
const productStoreCenter =
  'http://39.98.50.163:3000/mock/1346/showyu-product-center' + version

//营销中心
const promotionCenter = `/showyu-promotion-center${version}`

//用户中心
const memberCenter = '/showyu-member-center' + version

// 支付中心
const transactCenter = '/showyu-transact-center' + version

// 微信授权
export const wxAuth = '/showyu-member-center/api/v1/visitors/mall/login'

// 用户信息
export const findByToken = `${memberCenter}/visitors/findByToken`

// 我的订单
export const mobileOrderList = `${orderCenter}/childSaleOrders/page`
// 订单详情
export const mobileOrderDetail = id =>
  `${orderCenter}/childSaleOrders/detail/${id}`

// 文章列表
export const articleList = `${informationCenter}/articles/mobile`

// 文章tab
export const articleTab = `${informationCenter}/categorys/mobile/wechatPublist`

// 优惠券列表
export const couponListUrl = `${promotionCenter}/coupon/getMemberCoupon`

// 确认订单优惠券列表
export const confirmCouponListUrl = `${goodsCouponCenter}/coupon/getMemberCoupon`

// 秀币列表
export const getPointsListUrl = `${memberCenter}/memberPoints/getInfo`

// 商品详情
// export const getGoodsDetail = `${productCenter}/spcMallProducts/getProductDetail`

// 首页广告列表 Fixed: https切换，临时方案
export const getAdvertisementUrl =
  process.env.NODE_ENV === 'production'
    ? '//weshop.ishowyu.com/static/banners.json'
    : '/static/banners.json'

// 首页商品列表
export const getProductsUrl = `${productCenter}/spcMallProducts/getPreCategoryProductList`

// 收货地址列表
export const userAddressList = `${memberCenter}/mallMembers`

// 删除收货地址
export const deleteUserAddress = id => `${memberCenter}/mallMembers/${id}`

// 修改收货地址
export const updateUserAddress = id => `${memberCenter}/mallMembers/${id}`

// 提交确认订单
export const confirmOrder = `${orderCenter}/confirmOrder`

// 获取支付信息
export const getTransact = `${transactCenter}/transact`

// 商品——热销商品
export const getHotList = `${productCenter}/spcMallProducts/getHotProductList`

// 商品优惠券
export const goodsCoupon = `${goodsCouponCenter}/coupon/findCouponByProduct`

// 微信图片代理 GET
export const imageProxy = `${informationCenter}/ImageProxy`

// 文章页用户行为统计 POST
export const articleActionLog = `${informationCenter}/articleActionLogs`

// 统计阅读时长 PUT
export const readDruation = `${informationCenter}/articleActionLogs/endTime`

// 获取文章详情 GET
export const articleDetail = `${informationCenter}/articles/mobile`

// 咨询师排班信息
export const getCounselorWorkTime = `${productStoreCenter}/reservation/getCounselorWorkTime`

// 获取门店信息TODO:暂时调用接口
export const getStoreInfo = `${productStoreCenter}/reservation/storeInfo`

// 我的项目
export const getProjectList = `${orderCenter}/memberAssetProjects/list`

// 附近门店列表
export const storeList = `${addressCenter}/store`

//预约列表
export const reservationList = `${orderCenter}/reservation/list`

// 取消预约
export const cancelReservation = id => `${orderCenter}/reservation/list/${id}`

// 周年庆——城市列表
export const anniversaryCityList = `${orderCenter}/city/list`

//微信注册
export const userRegister = `${memberCenter}/visitors/register`

//微信登录
export const userLogin = `${memberCenter}/visitors/login`

//周年庆——用户报名
export const userAnniversaryCreate = `${promotionCenter}/pcWxCheckinActivityMembers/`

//周年庆—— 获取用户报名信息
export const getSerAnniversaryUser = id =>
  `${promotionCenter}/pcWxCheckinActivityMembers/${id}`
// 周年庆工作人员登录
export const anniversaryLogin = `${promotionCenter}/pcWxCheckinActivityInfos/login`

// 周年庆工作人员扫描二维码完成签到
export const anniversarySignIn = `${promotionCenter}/pcWxCheckinActivityMembers/checkin`

// 周年庆工作人员免登录验证
export const anniversaryVerify = `${promotionCenter}/pcWxCheckinActivityInfos/verification`

// 邀请有礼 卡包列表
export const listShareCoupon = `${promotionCenter}/coupon/listShareCoupon`

// 发送短信
// export const sendMsg = `${memberCenter}/visitors/getPhoneCode`

// 商品搜索
export const searchProducts = `${productCenter}/spcSearchProducts/`

// 生成支付订单
export const payOrder = `${orderCenter}/payOrders/finish`

// 活动商品
export const activityGoodsDetail = `${promotionCenter}/spcProductShareExtraction/getExtractionProductInfo`

// 提取面膜
export const extractionGoods = `${promotionCenter}/spcProductShareExtraction/createExtraction`

// 提取资产用支付接口
export const generatAssets = `${transactCenter}/transact/generatAssets`
// 获取订单交易流水
export const getPayDetail = `${transactCenter}/transact/preSaleOrderInfo`

// 邀请有礼
export const inviteRecord = `${goodsCouponCenter}/spcProductShareRecord/getInviteInfo`

// 获取分享二维码
export const inviteQrcode = `${goodsCouponCenter}/spcProductShareLink/wxShareLink`

// mask history
export const maskHistory = `${promotionCenter}/spcProductShareExtraction/getExtractionInfo`

// 获取购物车列表
export const shoppingCarts = `${orderCenter}/shoppingCarts`

// 设置购物车商品数量
export const setCartProductNum = (id, num) =>
  `${orderCenter}/shoppingCarts/${id}/set?quantity=${num}`

// 删除购物车商品
export const deleteProduct = id => `${orderCenter}/shoppingCarts/${id}`

// 加入购物车
// export const addToCart = `${orderCenter}/shoppingCarts`
