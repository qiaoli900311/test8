<template>
  <div class="goods-detail">
    <!-- 轮播图 -->
    <div class="swipe">
      <img :src="goods.imagesUrl" />
    </div>

    <!-- 商品基本信息 -->
    <van-cell class="cell-box base-info-cell">
      <div class="base-item">
        <span class="title text-lg">{{ goods.name }}</span>
      </div>

      <div class="base-item">
        <span class="text-lg" style="color:#c00;">
          {{ goods.price | price }}
        </span>
        <!-- <span class="font-l delete-line" v-if="goods.showPrice < goods.price">{{
          goods.price | price
        }}</span>
        <span class="red text-lg" v-if="goods.showPrice == goods.price">{{
          goods.price | price
        }}</span>-->
      </div>

      <!-- <div class="base-item" v-if="goods.showPrice < goods.price">
        <span class="info-label">优惠价</span>
        <strong class="red text-lg">{{ goods.showPrice | price }}</strong>
      </div>-->
      <!-- <div class="base-item">
        <span class="info-label">库存 :</span>
        <strong class="red text" style="color:#c00;">{{
          activeGoodsStock
        }}</strong>
      </div>-->
      <!-- <div class="base-item" @click="showStore">
        <span class="info-label">门店 :</span>
        <strong class="red text" style="color:#c00;">{{
          activeStoreName
        }}</strong>
        <van-icon name="arrow" style="margin-left:20px;" />
      </div>-->
      <div class="base-item base-item-flex">
        <div>
          <span class="info-label">运费 :</span>
          <strong class="text" style="color:#ccc;">¥6.00</strong>
        </div>
        <div>
          <span class="info-label">销量:</span>
          <strong class="text" style="color:#ccc;">998</strong>
        </div>
      </div>
    </van-cell>

    <!-- 优惠活动 -->
    <!--<van-cell is-link class="text-left mb10 active-cell">-->
    <!--<span class="info-label" slot="title">活&nbsp;&nbsp;&nbsp;动</span>-->
    <!--</van-cell>-->

    <!-- 领取优惠券 -->
    <!--<van-cell-->
    <!--class="cell-box cell-box-flex mb10"-->
    <!--is-link-->
    <!--center-->
    <!--v-if="goodsCouponList.length > 0"-->
    <!--&gt;-->
    <!--<div class="label font-l">领券</div>-->
    <!--<div class="coupon-item-box">-->
    <!--<div-->
    <!--class="coupon-item font-s"-->
    <!--v-for="item in goodsCouponList"-->
    <!--:key="item.id"-->
    <!--&gt;-->
    <!--{{ item.couponName }}-->
    <!--</div>-->
    <!--<div-->
    <!--class="coupon-item font-s"-->
    <!--v-for="(item, index) in goods.coupons"-->
    <!--:key="index"-->
    <!--&gt;-->
    <!--{{ item }}-->
    <!--</div>-->
    <!--</div>-->
    <!--</van-cell>-->

    <!-- 优惠活动 -->
    <van-cell-group class="cell-activity mb10">
      <van-cell
        center
        v-for="(item, index) in strategy"
        :key="index"
        class="strategy-cell"
      >
        <div class="activity-label">{{ getStrategieTypeName(item.type) }}</div>
        <div class="content font-l">{{ item.title }}</div>
        <!--<div class="tools red">789</div>-->
      </van-cell>
    </van-cell-group>

    <!--组合优惠-->
    <!-- <van-tabs class="com-price">
      <van-tab title="超值套餐">
        <img src="../../assets/zuhe.png" alt="组合商品" />
        <div class="low-price-info">
          <p>优惠价</p>
          <div><span class="low-price">￥ 298.00</span></div>
        </div>
      </van-tab>
      <van-tab title="雪露紫美白滋养组">
        <img src="../../assets/zuhe2.png" alt="组合商品" />
        <div class="low-price-info">
          <p>优惠价</p>
          <div><span class="low-price">￥ 369.00</span></div>
        </div>
      </van-tab>
    </van-tabs>-->

    <!-- 商品详情 纯图片 -->
    <van-cell class="cell-box">
      <icon-font
        icon="iconshangpinxiangqing"
        class="goods-info-icon font-l"
      ></icon-font>
      <div class="label font-l">宝贝详情</div>
    </van-cell>
    <div class="goods-info">
      <img v-lazy="goods.imagesUrl" />
    </div>

    <!-- 返回首页 -->
    <nuxt-link to="/">
      <div class="fix-icon go-home">
        <icon-font icon="iconshouye_" class="font-xl"></icon-font>
      </div>
    </nuxt-link>

    <!-- 去到购物车 -->
    <nuxt-link to="/cart">
      <div class="fix-icon go-cart">
        <van-icon name="shopping-cart-o" :info="cartNum" class="font-xl" />
      </div>
    </nuxt-link>

    <!-- 购买 -->
    <van-goods-action>
      <van-goods-action-big-btn
        text="加入购物车"
        @click="addCart"
        class="main-btn"
        :loading="cartLoading"
      />
      <!--<van-goods-action-big-btn class="main-btn" @click="confirmOrderHandle"-->
      <!--&gt;立即购买</van-goods-action-big-btn-->
      <!--&gt;-->
    </van-goods-action>
    <van-actionsheet
      v-model="selectStore"
      :actions="activeStore"
      @select="onSelect"
      @cancel="onCancel"
      cancel-text="取消"
    />
  </div>
</template>

<script>
import Vue from 'vue'

import IconFont from '@/components/icon-font'

import {
  Swipe,
  SwipeItem,
  Lazyload,
  GoodsAction,
  GoodsActionBigBtn,
  Actionsheet
} from 'vant'
import {
  getGoodsDetail,
  addToCart,
  setCartGoods,
  getGoodsStrategy,
  commonShowOne,
  commonList
} from '@/const/api.js'

import {formatDate} from '@/const/filter.js'

import {
  CONFIRM_ORDER,
  INVITE_TOPIC_NPN,
  INVITE_TOPIC_FNN
} from '@/const/path.js'

import {ACT_INVITE_TYPE, ACT_INVITE_USER, PRE_SET_FREIGHT} from '@/const/common'

import {mapState, mapActions} from 'vuex'

import {commonLog} from '@/const/log'

Vue.use(Lazyload)

const TRATEGIE_TYPE_NAME = {
  '-1': '会员价',
  0: '买高送低',
  1: '满额减额',
  2: '买件送件',
  3: '满额打折',
  4: '单品打折'
}

const DEFAULT_CAR_COUNT = 1

export default {
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-goods-action': GoodsAction,
    'van-goods-action-big-btn': GoodsActionBigBtn,
    'icon-font': IconFont,
    'van-actionsheet': Actionsheet
  },
  head() {
    return {
      title: this.goods.title
    }
  },
  data() {
    return {
      activeStore: [],
      id: this.$route.query.id,
      code: this.$route.query.code,
      company: this.$route.query.company,
      goods: {},
      activeGoodsStock: '',
      activeStoreName: '',
      goodsCouponList: [],
      paramPopup: false,
      selectStore: false,
      registerPopupVisible: false,
      PRE_SET_FREIGHT: 0,
      cartLoading: false,
      strategy: [] // 参与活动策略数组
    }
  },
  computed: {
    ...mapState('cart', ['cartNum', 'cartGoods']),
    ...mapState(['sale', 'userId'])
  },
  mounted() {
    this.id && this.getGoodsInfo()

    if (!this.cartNum) {
      this.getCartNum(this.userId)
    }
  },
  methods: {
    ...mapActions('cart', ['getCartNum', 'add2Cart']),
    showLoading() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: '加载中...'
      })
    },
    hideLoading() {
      this.$toast.clear()
    },
    showStore() {
      this.selectStore = true
    },
    onCancel() {
      this.selectStore = false
    },
    getGoodsInfo() {
      this.showLoading()
      this.$axios
        .$get(commonShowOne('commodity', this.id))
        .then(({payload}) => {
          this.goods = payload
          this.goods.memPrice = this.goods.price
          this.goods.showPrice = this.goods.sales
          // this.code && this.getGoodsStrategy()
        })
        .finally(e => {
          this.hideLoading()
        })

      this.$axios.get(commonList('stock')).then(res => {
        let storeArr = res.data.payload.data

        this.activeStore = storeArr.map((item, index) => {
          let goodsStock = null
          item.goodsStock.some(store => {
            if (store._id == this.id) {
              goodsStock = store.availableStock
              return true
            }
          })
          if (item.provincesName == item.cityName) {
            return {
              name: `${item.cityName}${item.districtName} ${item.storeName}`,
              goodsStock
            }
          } else {
            return {
              name: `${item.provincesName}${item.cityName}${
                item.districtName
              } ${item.storeName}`,
              goodsStock
            }
          }
        })
      })
    },
    onSelect(item) {
      this.activeGoodsStock = item.goodsStock
      this.activeStoreName = item.name
      this.selectStore = false
    },
    getGoodsStrategy() {
      this.$axios
        .$post(getGoodsStrategy, {}, {params: {code: this.code}})
        .then(({payload}) => {
          if (payload && payload.strategy) {
            this.strategy = payload.strategy
            this.strategy.forEach(item => {
              delete item.goods
              if (item.type === 4) {
                let saleP = Number(
                  (this.goods.price * item.rules[0].discount * 0.1).toFixed(2)
                )
                this.goods.showPrice = this.goods.memPrice
                  ? Math.min(Number(this.goods.memPrice), saleP)
                  : saleP
              }
            })
            this.strategy.forEach(item => {
              commonLog(
                {
                  memberId: this.userId,
                  module: 1,
                  actionCode: 0,
                  activityId: item.activityId,
                  targetId: this.goods.id
                },
                this
              )
            })
          }
        })
    },
    getStrategieTypeName(type) {
      return TRATEGIE_TYPE_NAME[type]
    },
    addCart() {
      // this.cartLoading = true
      const inCart = this.isInCart(this.goods.id)

      if (inCart) {
        const query = {
          filter: {userId: this.userId, code: inCart.code},
          body: {productCount: Number(inCart.productCount) + 1}
        }
        this.$axios.put(setCartGoods, query).then(res => {
          this.cartLoading = false
          this.$toast('加入成功，可在购物车查看哦！')
          this.getCartNum(this.userId)

          this.strategy.forEach(item => {
            commonLog(
              {
                memberId: this.userId,
                module: 1,
                actionCode: 1,
                activityId: item.activityId,
                targetId: this.goods.id
              },
              this
            )
          })
        })
      } else {
        const body = Object.assign(this.goods, {
          userId: this.userId,
          strategies: this.strategy,
          productCount: DEFAULT_CAR_COUNT,
          goodsId: this.goods._id
        })
        delete body._id
        this.$axios.post(addToCart, body).then(res => {
          this.cartLoading = false
          this.$toast('加入成功，可在购物车查看哦！')
          this.getCartNum(this.userId)

          this.strategy.forEach(item => {
            commonLog(
              {
                memberId: this.userId,
                module: 1,
                actionCode: 1,
                activityId: item.activityId,
                targetId: this.goods.id
              },
              this
            )
          })
        })
      }
    },
    isInCart(id) {
      let goods = null
      this.cartGoods.forEach(item => {
        if (item.id === id) goods = item
      })
      return goods
    },
    reportAddCart() {
      const s = new Set()
      this.strategy.forEach(x => s.add(x.activityId))
      const reportBody = []
      s.forEach(item => {
        reportBody.push({
          activityId: item,
          goodId: this.goods.id
        })
      })
      this.$axios
        .$post(reportAddCart, reportBody)
        .then(res => {})
        .catch()
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.goods-detail {
  background: #f2f2f2;

  &::after {
    content: '';
    display: block;
    height: 50px;
    width: 100%;
  }

  .text-left {
    text-align: left;
  }

  .text-lg {
    font-size: 18px;
  }

  .active-cell {
    padding: 0 15px 10px;
  }

  .swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  .info-label {
    width: 40px;
    display: inline-block;
    color: #aaa;
  }

  .delete-line {
    text-decoration: line-through;
    color: #aaa;
  }

  .com-price {
    margin-bottom: 10px;
    background-color: #fff;
  }

  .low-price-info {
    text-align: left;
    color: #ccc;
    padding: 0 15px;

    .low-price {
      font-size: 28px;
      color: $primary-color;
    }
  }

  .strategy-cell {
    .van-cell__value {
      display: flex;
      align-items: center;
    }
  }

  .cell-box {
    padding: 15px;
    background: #fff;

    &.cell-box-flex {
      .van-cell__value {
        display: flex;
        align-items: center;
      }
    }

    .label {
      display: inline-block;
      margin-right: 15px;
      color: $text-gray;
      vertical-align: middle;
    }

    .title {
      color: $gray;
    }
  }

  .base-info-cell {
    padding: 15px 15px 0;

    .base-item {
      margin-bottom: 5px;

      .van-icon {
        vertical-align: text-bottom;
      }
    }

    .base-item-flex {
      justify-content: space-between;
      display: flex;

      .info-label {
        width: 40px;
      }
    }
  }

  .cell-activity {
    padding: 5px 0;
  }

  .coupon-item-box {
    display: inline-block;
    max-width: 260px;
  }

  .coupon-item {
    display: inline-block;
    padding: 0 15px;
    border: 1px solid $primary-color;
    color: $primary-color;
    border-radius: 2px;
    line-height: 20px;
    position: relative;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    &::before,
    &::after {
      content: '';
      display: block;
      width: 3px;
      height: 6px;
      position: absolute;
      border: 1px solid $primary-color;
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      left: -1px;
      border-left-color: #fff;
      border-radius: 0 50px 50px 0;
    }

    &::after {
      right: -1px;
      border-right-color: #fff;
      border-radius: 50px 0 0 50px;
    }
  }

  .express {
    display: flex;
    justify-content: flex-end;

    .sales {
      margin-left: 11px;
    }
  }

  .activity-label {
    color: $primary-color;
    border: 1px solid $primary-color;
    border-radius: 2px;
    padding: 0 5px;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
  }

  .content {
    color: $text-gray;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }

  .tools {
    float: right;
    vertical-align: center;
    line-height: 30px;
  }

  .goods-info-icon {
    background: -webkit-linear-gradient(-30deg, #e5006e, #ffa6a6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 20px;
    vertical-align: middle;
  }

  .goods-info {
    img {
      width: 100%;
      display: block;
    }
  }

  .fix-icon {
    width: 41px;
    height: 41px;
    line-height: 41px;
    color: $primary-color;
    border-radius: 50%;
    box-shadow: 0 0 10px $primary-color;
    position: fixed;
    right: 7px;
    background: rgba(255, 255, 255, 0.6);
    transition: background 0.3s ease;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 22px;
    }

    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .go-home {
    bottom: 140px;
  }

  .go-cart {
    bottom: 80px;
  }

  .goods-param {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #fff;

    .param-title {
      color: $gray;
      margin: 20px auto;
      width: 80px;
      position: relative;

      &::before,
      &::after {
        content: '';
        display: block;
        width: 160px;
        height: 1px;
        background: $gray;
        position: absolute;
        top: 55%;
        transform: translateY(-50%) scale(0.5);
      }

      &::before {
        left: -120px;
      }

      &::after {
        right: -120px;
      }
    }

    .param-label {
      text-align: left;
      line-height: 30px;
      color: $text-gray;
    }

    .param-content {
      text-align: left;
      line-height: 30px;
      color: $gray;
    }
  }

  .main-btn {
    background: $primary-color;

    a {
      color: #fff;
    }
  }

  .red {
    color: $primary-color;
  }

  .gray {
    color: $text-gray;
  }

  .van-button--warning {
    border: none;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .addCart-btn {
    background-color: #f7508c;
  }

  .van-tabs__wrap {
    z-index: 0;
  }
}
</style>
