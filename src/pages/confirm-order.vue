<template>
  <div class="confirm-order">
    <div class="address">
      <!-- <van-cell-group>
        <van-cell is-link center class="mb10">
          <van-row>
            <van-col span="10" class="address-name">张三</van-col>
            <van-col span="13" offset="1">13888888888</van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <icon-font
                icon="iconshouhuodizhi"
                class="red mr14 font-m"
              ></icon-font>
              四川省成都市武侯区花样年香年广场6-6
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>-->
      <!-- <van-tabs type="card" @click="onClick">
        <van-tab title="到店自提"></van-tab>
        <van-tab title="商家配送"></van-tab>
      </van-tabs>-->
      <!-- <van-cell-group v-if="radio == 2">
        <van-field
          class="des-cell"
          :value="`匿名先生 ${$store.state.user.userName}`"
          label="提货客户"
          right-icon="arrow"
          @click-right-icon="choseAddress = true"
          disabled
        />
        <van-field
          class="des-cell"
          autosize
          type="textarea"
          :value="storeLocation"
          label="提货地址"
          right-icon="arrow"
          @click-right-icon="choseStore = true"
          disabled
        />
        <van-field
          class="des-cell"
          value="请尽快到自提点提货"
          label="提货时间"
          disabled
        />
      </van-cell-group>-->
      <van-cell>
        <div class="flex-cell">
          <div style="color:black; font-weight:bold;">
            <van-icon
              name="location-o"
              style="vertical-align:text-top;"
            />收货人: {{ currentAddress.name }}
          </div>
          <div>{{ currentAddress.tel }}</div>
        </div>
        <div class="flex-cell" style="color:#ccc; margin-top:5px;">
          <div>收货地址: {{ currentAddress.address }}</div>
          <div @click="choseAddress = true">
            <van-icon name="arrow" />
          </div>
        </div>
      </van-cell>
      <div style="border-top:10px solid #efefef;"></div>
      <van-cell class="mb10 goods-box" v-for="item in products" :key="item.id">
        <img :src="item.imagesUrl" :alt="item.name" class="goods-img" />
        <div class="goods-desc">
          <div class="goods-name-box">
            <div class="goods-name">{{ item.name }}</div>
            <div class="red" v-if="item.isGive">赠送</div>
          </div>

          <div class="goods-sku font-s">
            价格：
            <span
              v-if="item.calculatePrice"
              :class="{
                'delete-line': item.price > item.calculatePrice || item.isGive,
                red: item.price <= item.calculatePrice
              }"
              >{{ item.price }}</span
            >
            <span
              v-else
              :class="{
                'delete-line': item.price > item.showPrice || item.isGive,
                red: item.price <= item.showPrice
              }"
              >{{ item.price }}</span
            >
          </div>
          <div
            class="font-s red"
            v-if="
              !item.isGive &&
                item.price > item.calculatePrice &&
                item.calculatePrice
            "
          >
            优惠价：{{ item.calculatePrice }}
          </div>
          <div
            class="font-s red"
            v-if="
              !item.isGive && item.price > item.memPrice && !item.calculatePrice
            "
          >
            优惠价：{{ item.memPrice }}
          </div>

          <div class="goods-sku font-s">数量：{{ item.productCount }}</div>
        </div>
      </van-cell>

      <!-- 优惠券 暂时不上 -->
      <van-cell class="mb10 default-box" is-link @click="showCouponList = true">
        <div class="label font-m">优惠券</div>
        <div class="value font-m">
          已选
          <span class="red">{{ couponNum }}</span
          >张
        </div>
      </van-cell>

      <!-- 积分抵扣 暂时不上 -->
      <van-cell class="mb10 default-box" is-link>
        <div class="label font-m">积分抵扣</div>
        <div class="value font-m">￥ 1元</div>
      </van-cell>

      <!-- 订单详情 -->
      <van-cell class="mb10">
        <div class="order-desc">
          <div class="desc-row">
            <div class="gray font-m">
              商品(
              <span class="red">{{ productCount }}</span
              >件)
            </div>
            <div class="text-gray font-m">{{ totalPrice | price }}</div>
          </div>
          <div class="desc-row" v-if="bestPlan.saveMoney > 0">
            <div class="font-m">活动优惠</div>
            <div class="font-m">- {{ bestPlan.saveMoney | price }}</div>
          </div>
          <div class="desc-row" v-if="couponNum > 0">
            <div class="font-m">
              优惠券(
              <span class="red">{{ couponNum }}</span
              >张)
            </div>
            <div class="font-m">- {{ couponPrice | price }}</div>
          </div>
          <div class="desc-row">
            <div class="font-m">
              积分抵用(
              <span class="red">1000</span>分)
            </div>
            <div class="font-m">- {{ integralPrice | price }}</div>
          </div>
          <div class="desc-row">
            <div class="font-m">运费</div>
            <div class="font-m text-gray">{{ shippingPrice | price }}</div>
          </div>
          <div class="desc-row">
            <div class="gray font-m">合计</div>
            <div class="red font-m">{{ resultPrice | price }}</div>
          </div>
          <div class="desc-row">
            <div class="gray font-m">获得积分</div>
            <div class="red font-m">10分</div>
          </div>
        </div>
      </van-cell>

      <!-- 提交订单 -->
      <div class="submit-box">
        <div class="sum font-m">
          应付金额：
          <span class="red">{{ resultPrice | price }}</span>
        </div>
        <div class="submit" @click="getPayData">去支付</div>
      </div>

      <!-- 优惠券选择 -->
      <van-popup v-model="showCouponList" position="bottom">
        <coupon-list
          :canUse="usableCoupons"
          :cantUse="cantUseCoupons"
          @selectedCouponHandle="selectedCouponHandle"
        ></coupon-list>
      </van-popup>
      <van-popup
        v-model="choseStore"
        position="bottom"
        class="chose-store"
        :style="{height: '100%'}"
      >
        <van-radio-group v-model="store">
          <van-nav-bar left-arrow @click-left="onClickLeft" title="选择门店" />
          <div class="filterCheck">
            <div>
              上海市 长宁区
              <van-icon
                name="arrow-down"
                style="vertical-align: text-bottom;"
              />
            </div>
            <van-checkbox v-model="stockStore" shape="square"
              >只看有货门店</van-checkbox
            >
          </div>
          <div class="searchStore">
            <form action="/">
              <van-search
                v-model="searchKey"
                placeholder="搜索你喜欢的门店"
                show-action
                @search="onSearch"
              >
                <!-- <van-icon slot="left-icon" name="search" /> -->
                <div slot="action" @click="onSearch">
                  <van-icon
                    name="search"
                    style="vertical-align: text-bottom;"
                  />
                </div>
              </van-search>
            </form>
          </div>
          <div>
            <img :src="require('~/assets/stores.png')" style="width:100%;" />
          </div>
          <van-cell-group>
            <van-cell
              class="storeItem"
              clickable
              @click="changeStore(item)"
              v-for="(item, index) in storeList"
              :key="index"
            >
              <div class="store-item">
                <div>
                  <p class="title">{{ item.storeName }}</p>
                  <p class="des">
                    地址：
                    <span v-if="item.provincesName != item.cityName">
                      {{ item.provincesName }}
                    </span>
                    {{ item.cityName }}
                    {{ item.districtName }}
                  </p>
                  <p class="des">营业时间：{{ item.openTime }}</p>
                  <p class="des">联系电话： {{ item.contactPhoneNumber }}</p>
                  <p class="distance">距您{{ item.distance }}m</p>
                </div>
                <div>
                  <van-radio slot="right-icon" :name="item._id" />
                </div>
              </div>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
      <!-- 选择地址 -->
      <van-popup
        v-model="choseAddress"
        position="bottom"
        class="chose-store"
        :style="{height: '100%'}"
      >
        <van-address-list
          v-model="chosenAddressId"
          :list="addressList"
          @select="onSelect"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/icon-font'
import CouponList from '@/container/confirm-order/coupon-list.vue'
import expressPopup from '@/container/confirm-order/express.vue'
import {
  subOrder,
  buy,
  deleteCartPro,
  deleteCouPon,
  commonList,
  sendMsg,
  commonCreateOne,
  commonUpDate
} from '@/const/api.js'

import {Checkbox, AddressList, Dialog} from 'vant'

import {mapGetters, mapActions, mapState} from 'vuex'
import {ORDER_LIST} from '@/const/path'
export default {
  components: {
    IconFont,
    CouponList,
    expressPopup,
    'van-address-list': AddressList
  },
  head() {
    return {
      title: '确认订单'
    }
  },
  data() {
    return {
      radio: 0,
      store: '',
      activeGoods: [],
      stockStore: true,
      choseStore: false,
      choseAddress: false,
      searchKey: '',
      checked: false,
      storeLocation: '',
      shipper: '',
      showCouponList: false, //优惠券列表展示
      usableCoupons: [], //可用优惠券
      cantUseCoupons: [], //不可用优惠券
      selectedCoupon: [], //选中的优惠券code
      products: [],
      storeList: [],
      storeArr: [],
      chosenAddressId: '1',
      //广东省广州市天河区中泰北塔3A  XXX女士 12345678901
      //湖北省武汉市江汉区泛海国际SOHO城 吴先生10987654321
      //广东省深圳市南山区深圳湾生态科技园A1栋 张先生 12332145665

      addressList: [
        {
          id: '1',
          name: 'X女士',
          provinceCode: '440000',
          provinceName: '广东省',
          tel: '12345678901',
          address: '广东省广州市天河区中泰北塔3A'
        },
        {
          id: '2',
          name: '吴先生',
          provinceCode: '420000',
          provinceName: '湖北省',
          tel: '10987654321',
          address: '湖北省武汉市江汉区泛海国际SOHO城'
        },
        {
          id: '3',
          name: '吴先生',
          provinceCode: '440000',
          provinceName: '广东省',
          tel: '12332145665',
          address: '广东省深圳市南山区深圳湾生态科技园A1栋'
        }
      ],
      bestPlan: {},
      addressId: 1,
      activeStore: {},
      couponNum: 0, // 使用的优惠券数量
      couponPrice: 0, // 优惠券优惠金额
      integralPrice: 1, // 积分抵扣金额
      shippingPrice: 0 // 运费
    }
  },
  computed: {
    ...mapState(['user', 'userId', 'couponList']),
    ...mapGetters('confirm-order', ['getBestPlan']),
    currentAddress() {
      let result = {}
      for (var item of this.addressList) {
        if (item.id === this.chosenAddressId) {
          result = item
        }
      }
      return result
    },
    productCount() {
      let num = 0
      this.products.forEach(item => {
        num += Number(item.productCount)
      })
      return num
    },
    totalPrice() {
      // let price = 0
      // this.products.forEach(item => {
      //   if (!item.isGive) price += item.calculatePrice * item.productCount
      // })
      return (this.bestPlan.totalPrice + this.bestPlan.saveMoney).toFixed(2)
    },
    resultPrice() {
      return (
        this.bestPlan.totalPrice -
        this.integralPrice -
        this.couponPrice
      ).toFixed(2)
    }
  },
  async mounted() {
    // 克隆一份 页面需要修改
    this.bestPlan = JSON.parse(JSON.stringify(this.getBestPlan))
    // this.getStoreList()
  },
  watch: {
    bestPlan() {
      let pro = []
      this.bestPlan.strategieArr.forEach(item => {
        pro.push(...item.products)
      })
      this.products = pro

      // 产品数据数来后判断哪些优惠券可用
      // this.setCoupon()
    }
  },
  methods: {
    ...mapActions('cart', ['getCartNum']),
    ...mapActions(['getUserInfo']),
    onSelect(item) {
      this.chosenAddressId = item.id
      this.choseAddress = false
    },
    getStoreList() {
      this.$axios.get(commonList('stock')).then(res => {
        // this.storeList = res.data.payload.data
        let storeList = res.data.payload.data
        this.storeArr = storeList
        let arr = []
        let choseGoods = this.products.map(item => {
          return {
            id: item.goodsId,
            productCount: item.productCount
          }
        })
        this.activeGoods = choseGoods

        /* 获取门店所有商品id和当前选中商品id如果包含则加入当前可选择门店清单 前提是建立在库存为0不在当前门店商品字段下 */
        storeList.forEach(item => {
          // let storeGoods = item.goodsStock.map(item => item.id).join(',')
          // let choseGoods = this.products.map(item => item.id).join(',')
          // if (storeGoods.indexOf(choseGoods) != -1) {
          //   arr.push(item)
          // }
          let pushFlag = 0
          choseGoods.some(goods => {
            item.goodsStock.some(storeStock => {
              if (
                storeStock._id == goods.id &&
                storeStock.stock >= goods.productCount
              ) {
                pushFlag += 1
                return true
              }
            })
            if (pushFlag >= choseGoods.length) {
              arr.push(item)
              return true
            }
          })
        })
        this.storeList = arr
        let location = this.storeList[0]
        this.activeStore = location
        this.store = location._id
        if (location.provincesName === location.cityName) {
          this.storeLocation = `${location.storeName} ${location.cityName}${
            location.districtName
          } ${location.detailAddress} | ${location.distance} M`
        } else {
          this.storeLocation = `${location.storeName} ${
            location.provincesName
          }${location.cityName}${location.districtName} ${
            location.detailAddress
          } | ${location.distance} M`
        }
      })
    },
    onClick(tab) {
      this.radio = tab
    },
    onSearch(v) {
      let arr = []
      arr = this.storeArr.filter(item => {
        if (item.storeName.indexOf(this.searchKey) != -1) {
          return item
        }
      })
      this.storeList = arr
    },
    changeStore(item) {
      this.store = item._id
      this.activeStore = item
      if (item.provincesName == item.cityName) {
        this.storeLocation = `${item.storeName} ${item.cityName}${
          item.districtName
        } ${item.detailAddress} | ${item.distance} M`
      } else {
        this.storeLocation = `${item.storeName} ${item.provincesName}${
          item.cityName
        }${item.districtName} ${item.detailAddress} | ${item.distance} M`
      }
      this.choseStore = false
    },
    showLoading() {
      return this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: '提交中...'
      })
    },
    onClickLeft() {
      this.choseStore = false
      this.choseAddress = false
    },
    goStore() {
      this.radio = '1'
      this.choseStore = true
    },
    hideLoading(loading) {
      loading.clear()
      this.$toast.clear(true)
    },
    // 计算哪些优惠券可用
    setCoupon() {
      this.usableCoupons = []
      this.cantUseCoupons = []
      let list = JSON.parse(JSON.stringify(this.couponList || {})) // 需要修改克隆一份

      /* 暂时关闭优惠券功能 */
      return
      for (let item of list) {
        // 品类和品牌都限制
        if (item.categoryName && item.brandName) {
          let allPrice = 0
          this.products.forEach(pro => {
            if (
              item.categoryName == pro.categoryName &&
              item.brandName == pro.brandName
            )
              allPrice += Number(pro.memPrice * pro.productCount)
          })
          if (allPrice === 0) {
            this.cantUseCoupons.push(
              Object.assign(item, {
                state: 'expried',
                disReason: `仅${item.categoryName}品类下${
                  item.brandName
                }品牌可用`
              })
            )
            continue
          }

          if (allPrice >= item.limitPrice) {
            this.usableCoupons.push(Object.assign(item, {state: 'unused'}))
          } else {
            this.cantUseCoupons.push(
              Object.assign(item, {
                state: 'expried',
                disReason: `满${item.limitPrice}元可用`
              })
            )
          }
          continue
        }
        // 只限制品类
        if (item.categoryName) {
          let allPrice = 0
          this.products.forEach(pro => {
            if (item.categoryName == pro.categoryName)
              allPrice += Number(pro.memPrice * pro.productCount)
          })
          if (allPrice === 0) {
            this.cantUseCoupons.push(
              Object.assign(item, {
                state: 'expried',
                disReason: `仅${item.categoryName}品类可用`
              })
            )
            continue
          }
          if (allPrice >= item.limitPrice) {
            this.usableCoupons.push(Object.assign(item, {state: 'unused'}))
          } else {
            this.cantUseCoupons.push(
              Object.assign(item, {
                state: 'expried',
                disReason: `满${item.limitPrice}元可用`
              })
            )
          }
          continue
        }
        // 只限制品牌
        if (item.brandName) {
          let allPrice = 0
          this.products.forEach(pro => {
            if (item.brandName == pro.brandName)
              allPrice += Number(pro.memPrice * pro.productCount)
          })
          if (allPrice === 0) {
            this.cantUseCoupons.push(
              Object.assign(item, {
                state: 'expried',
                disReason: `仅${item.brandName}品牌可用`
              })
            )
            continue
          }
          if (allPrice >= item.limitPrice) {
            this.usableCoupons.push(Object.assign(item, {state: 'unused'}))
          } else {
            this.cantUseCoupons.push(
              Object.assign(item, {
                state: 'expried',
                disReason: `满${item.limitPrice}元可用`
              })
            )
          }
          continue
        }
        // 品类、品牌都不限制，只考虑限制金额
        let allPrice = 0
        this.products.forEach(pro => {
          allPrice += Number(pro.memPrice * pro.productCount)
        })
        if (allPrice >= item.limitPrice) {
          this.usableCoupons.push(Object.assign(item, {state: 'unused'}))
        } else {
          this.cantUseCoupons.push(
            Object.assign(item, {
              state: 'expried',
              disReason: `满${item.limitPrice}元可用`
            })
          )
        }
      }

      // 初始化最优优惠券组合
      this.setBestCoupon()
    },
    setBestCoupon() {
      let bestArr = []
      let best = null
      this.usableCoupons &&
        this.usableCoupons.forEach(item => {
          if (!item.isMutex) {
            bestArr.push(item.code)
          } else {
            best
              ? best.discountPrice < item.discountPrice
                ? (best = item)
                : ''
              : (best = item)
          }
        })
      if (best) bestArr.push(best.code)
      if (bestArr.length > 0) {
        this.selectedCouponHandle(bestArr)
      }
    },
    selectedCouponHandle(list) {
      // 优惠券组件处理
      this.couponPrice = 0
      this.couponNum = list.length
      this.selectedCoupon = list
      list &&
        list.forEach(code => {
          this.usableCoupons.forEach(item => {
            if (code === item.code)
              this.couponPrice = Number(
                (this.couponPrice + item.discountPrice).toFixed(2)
              )
          })
        })
      this.showCouponList = false
    },

    getPayData() {
      //购物车去支付
      if (this.radio === '') {
        this.$toast('收货方式不可为空')
        return
      }

      let confirm = {
        channelId: '5d5552a313431516806c93b0', //自营渠道
        accId: this.userId,
        province: this.currentAddress.provinceCode,
        recvProvince: this.currentAddress.provinceName,
        recvAddress: this.currentAddress.address,
        recvPhone: this.currentAddress.tel,
        recvName: this.currentAddress.name,
        products: this.products,
        goodsId: this.products[0].goodsId,
        count: Number.parseInt(this.products[0].productCount),
        status: 0, // 0: 已支付，1: 待支付，2: 已关闭
        date: new Date().getTime(),
        orderPrice: Number.parseFloat(this.resultPrice), // 总支付金额(包括各种优惠和非活动商品金额)，订单列表需要
        payPrice: Number.parseFloat(this.resultPrice) // 总支付金额(包括各种优惠和非活动商品金额)，订单列表需要
      }

      const cartId = this.products[0]._id

      let loading = this.showLoading()
      // 存到order表
      this.$axios
        .$post('/poc/api/v1/zhoudafu/newOrder', confirm)
        .then(res => {
          const ifFail = res.payload.message

          if (ifFail) {
            this.$toast.fail({
              duration: 1000,
              forbidClick: true,
              mask: true,
              message: res.payload.message
            })
          }

          // 删除购物车商品
          const query = {
            _id: [cartId]
          }
          this.$axios
            .$delete(
              `/poc/api/v1/common/destroy?collection=zhoudafu_cart&query=${JSON.stringify(
                query
              )}`
            )
            .then(r => {
              sessionStorage.removeItem('bestPlan')
              this.$router.replace({
                path: ifFail ? '/' : '/order/list',
                query: {
                  user: this.user.userName
                }
              })
            })
            .catch(e => {
              console.log('TCL: getPayData -> e', e)
            })

          // 删除优惠券
          // this.selectedCoupon.forEach(code => {
          //   this.$axios
          //     .$post(
          //       deleteCouPon,
          //       {},
          //       {params: {userName: this.user.userName, code: code}}
          //     )
          //     .then(r => {
          //       this.getUserInfo(true) // 强制重新获取用户数据
          //     })
          //     .catch(e => {})
          // })

          // stock 修改对应门店-对应商品库存 锁库++ 可用库--
          // store 累计返点金额 ++
          // store 未提取金额 ++
        })
        .catch(e => {
          this.hideLoading(loading)
        })
    },

    getActivitys(strategieArr) {
      let ids = []
      let newArr = []
      let failPros = []
      strategieArr.forEach(item => {
        let id = item.activityId
        let goods = item.products.map(pro => {
          const {
            id,
            productCount,
            code,
            name,
            brandName,
            categoryName,
            imagesUrl,
            actualPrice,
            isGive
          } = pro
          return {
            id,
            productCount,
            code,
            name,
            brandName,
            categoryName,
            imagesUrl,
            actualPrice,
            isGive: isGive || false
          }
        })
        let index = ids.indexOf(id)
        if (!item.isSuccess) {
          failPros.push(...goods)
        } else {
          if (index === -1) {
            ids.push(id)
            newArr.push({activityId: id, goods})
          }
          if (index > -1) {
            newArr[index].goods.push(...goods)
          }
        }
      })
      let hasLevel = newArr.some(item => item.activityId === 'level')
      if (failPros.length > 0) {
        if (hasLevel) {
          newArr.forEach(item => {
            if (item.activityId === 'level') item.goods.push(...failPros)
          })
        } else {
          newArr.push({activityId: 'level', goods: failPros})
        }
      }
      return newArr
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.confirm-order {
  background: #f2f2f2;
  min-height: calc(100vh - 50px);

  &::after {
    content: '';
    display: block;
    height: 100px;
  }

  .van-cell {
    padding: 14px;

    .flex-cell {
      display: flex;
      justify-content: space-between;
    }
  }

  .searchStore {
    .van-cell {
      padding: 7px 14px;
    }
  }

  .des-cell {
    padding-left: 0;
    color: #999;

    input {
      text-align: right;
      color: black;
    }

    textarea {
      text-align: right;
      color: black;
    }
  }

  .chose-store {
    background-color: #efefef;

    .filterCheck {
      display: flex;
      height: 35px;
      line-height: 35px;
      justify-content: space-between;
      background: white;
      padding: 0 17px;
      border-bottom: 5px solid #efefef;
    }

    .storeItem {
      border-top: 10px solid #efefef;

      .store-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          font-size: 20px;
          line-height: 36px;
        }

        .distance {
          color: #ccc;
        }
      }
    }
  }

  .choseChanel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    .des {
      color: #ccc;
      font-size: 14px;
    }
  }

  .van-tabs--card {
    padding-top: 60px;

    .van-tabs__wrap {
      height: 60px;

      .van-tabs__nav--card {
        margin: 10px 15px;
        height: 35px;

        .van-tab {
          line-height: 35px;
        }
      }
    }
  }

  .address-name {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods-box {
    .van-cell__value {
      display: flex;
    }

    .goods-img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  .goods-desc {
    width: 100%;
    position: relative;

    .goods-name-box {
      display: flex;
      justify-content: space-between;

      .goods-name {
        max-width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .goods-sku {
      color: $text-gray;
    }

    .goods-step {
      position: absolute;
      bottom: 0;
      left: 0;

      .van-stepper__input {
        width: 40px;
        height: 21px;
        color: $gray;
        border-color: $primary-color;
      }

      .van-stepper__minus,
      .van-stepper__plus {
        border-color: $primary-color;
        width: 25px;
        height: 25px;

        &::before,
        &::after {
          background-color: $primary-color;
        }
      }

      .van-stepper__minus {
        border-radius: 4px 0 0 4px;
      }

      .van-stepper__plus {
        border-radius: 0 4px 4px 0;
      }
    }
  }

  .default-box {
    .van-cell__value {
      display: flex;
      justify-content: space-between;
    }

    .label {
      color: $gray;

      &-gray {
        color: $placeholder-color;
      }
    }

    .value {
      color: $text-gray;

      &-gray {
        color: $placeholder-color;
      }
    }
  }

  .order-desc {
    .desc-row {
      display: flex;
      justify-content: space-between;
      line-height: 28px;
    }
  }

  .submit-box {
    display: flex;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background: #fff;

    .submit {
      background: $primary-color;
      line-height: 50px;
      color: #fff;
      width: 94px;
      margin-left: 14px;
    }
  }

  .express {
    text-align: left;
    width: 260px;
    padding: 10px 15px;
  }

  .express-popup {
    border-radius: 8px;
  }

  .red {
    color: $primary-color;
  }

  .gray {
    color: $gray;
  }

  .text-gray {
    color: $text-gray;
  }

  .close-icon {
    color: #ccc;
    display: flex;
    justify-content: flex-end;

    i {
      padding: 0 0 8px 8px;
    }
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .ml4 {
    margin-left: 4px;
  }

  .mr14 {
    margin-right: 14px;
  }
}
</style>
