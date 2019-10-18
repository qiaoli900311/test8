<template>
  <div class="cart">
    <!--活动广告位-->
    <section class="active-tip-content">
      <span class="active-tip">
        <van-icon name="point-gift-o" />周大福项链大优惠,会员双重福利等你来！!
      </span>
      <span class="more-action">更多</span>
    </section>

    <no-results slot="no-results" v-if="cartGoodsCopy.length <= 0"></no-results>

    <!--购物车商品列表-->
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <!--选中商品-->
      <section v-for="strategie in bestPlan.strategieArr" class="strategie">
        <div v-if="strategie.type != 2">
          <!-- <van-cell class="active-title" :clickable="false">
            <template slot="title">
              <template v-if="strategie.isSuccess">
                <div class="type-card">
                  享受: {{ strategie.ruleTitle.join('+') }}
                </div>
              </template>
              <template v-else
                ><span class="recommend-card">推荐</span>
                <span class="active-name">{{ strategie.title }}</span>
                <span @click="goMall"> 去凑单 ></span></template
              >
            </template>
          </van-cell>-->

          <van-checkbox
            class="card-goods__item"
            v-for="item in strategie.products"
            :key="item.id"
            :name="item.id"
            :label-disabled="true"
          >
            <van-cell class="mb10 goods-box" :key="item.id">
              <img :src="item.imagesUrl" :alt="item.name" class="goods-img" />
              <div class="goods-desc">
                <div class="goods-name-box">
                  <div class="goods-name">{{ item.name }}</div>
                </div>
                <template
                  v-if="
                    strategie.type == -1 ||
                      strategie.type == 4 ||
                      !strategie.isSuccess
                  "
                >
                  <div class="goods-sku font-s">
                    价格：
                    <span>{{ item.price }}</span>
                  </div>
                  <!-- <div class="font-s red" v-if="item.price > item.showPrice">
                    优惠价：{{ item.showPrice }}
                  </div> -->
                </template>
                <template v-else>
                  <div class="goods-sku font-s">
                    价格：
                    <span
                      :class="{
                        'delete-line': item.price > item.calculatePrice,
                        red: item.price <= item.calculatePrice
                      }"
                      >{{ item.price }}</span
                    >
                  </div>
                  <div
                    class="font-s red"
                    v-if="item.price > item.calculatePrice"
                  >
                    优惠价：{{ item.calculatePrice }}
                  </div>
                </template>

                <div
                  class="font-s"
                  @click="showCouponListAction(item)"
                  v-if="item.strategies"
                >
                  更多优惠 >
                </div>

                <div class="goods-step">
                  <van-stepper
                    integer
                    :min="1"
                    @blur="itemNumChange($event, item)"
                    @minus="itemNumChange($event, item, 'minus')"
                    @plus="itemNumChange($event, item, 'plus')"
                    :value="item.productCount"
                  />
                  <!--<i-->
                  <!--class="delete iconfont iconshanchu"-->
                  <!--@click="deleteItem(item)"-->
                  <!--&gt;</i>-->
                </div>
              </div>
            </van-cell>
          </van-checkbox>
        </div>

        <div v-if="strategie.type == 2">
          <div
            v-if="strategie.successPro.length > 0"
            :class="{'bt-m': strategie.failePro.length > 0}"
          >
            <van-cell class="active-title" :clickable="false">
              <template slot="title">
                <div class="type-card">
                  享受: {{ strategie.ruleTitle.join('+') }}
                </div>
              </template>
            </van-cell>

            <van-checkbox
              class="card-goods__item"
              v-for="item in strategie.successPro"
              :key="item.id"
              :name="item.id"
              :label-disabled="true"
            >
              <van-cell class="mb10 goods-box" :key="item.id">
                <img :src="item.imagesUrl" :alt="item.name" class="goods-img" />
                <div class="goods-desc">
                  <div class="goods-name-box">
                    <div class="goods-name">{{ item.name }}</div>
                  </div>
                  <template
                    v-if="
                      strategie.type == -1 ||
                        strategie.type == 4 ||
                        !strategie.isSuccess
                    "
                  >
                    <div class="goods-sku font-s">
                      价格：
                      <span
                        :class="{
                          'delete-line': item.price > item.showPrice,
                          red: item.price <= item.showPrice
                        }"
                        >{{ item.price }}</span
                      >
                    </div>
                    <div class="font-s red" v-if="item.price > item.showPrice">
                      优惠价：{{ item.showPrice }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="goods-sku font-s">
                      价格：
                      <span
                        :class="{
                          'delete-line': item.price > item.calculatePrice,
                          red: item.price <= item.calculatePrice
                        }"
                        >{{ item.price }}</span
                      >
                    </div>
                    <div
                      class="font-s red"
                      v-if="item.price > item.calculatePrice"
                    >
                      优惠价：{{ item.calculatePrice }}
                    </div>
                  </template>

                  <div
                    class="font-s"
                    @click="showCouponListAction(item)"
                    v-if="item.strategies"
                  >
                    更多优惠 >
                  </div>

                  <div class="goods-step">
                    <van-stepper
                      integer
                      :min="1"
                      @blur="itemNumChange($event, item)"
                      @minus="itemNumChange($event, item, 'minus')"
                      @plus="itemNumChange($event, item, 'plus')"
                      :value="item.productCount"
                    />
                    <!--<i-->
                    <!--class="delete iconfont iconshanchu"-->
                    <!--@click="deleteItem(item)"-->
                    <!--&gt;</i>-->
                  </div>
                </div>
              </van-cell>
            </van-checkbox>
          </div>
          <div v-if="strategie.failePro.length > 0">
            <van-cell class="active-title" :clickable="false">
              <template slot="title">
                <span class="recommend-card">推荐</span>
                <span class="active-name">{{ strategie.title }}</span>
                <span @click="goMall">去凑单 ></span>
              </template>
            </van-cell>

            <van-checkbox
              class="card-goods__item"
              v-for="item in strategie.failePro"
              :key="item.id"
              :name="item.id"
              :label-disabled="true"
            >
              <van-cell class="mb10 goods-box" :key="item.id">
                <img :src="item.imagesUrl" :alt="item.name" class="goods-img" />
                <div class="goods-desc">
                  <div class="goods-name-box">
                    <div class="goods-name">{{ item.name }}</div>
                  </div>
                  <template
                    v-if="
                      strategie.type == -1 ||
                        strategie.type == 4 ||
                        !strategie.isSuccess
                    "
                  >
                    <div class="goods-sku font-s">
                      价格：
                      <span
                        :class="{
                          'delete-line': item.price > item.showPrice,
                          red: item.price <= item.showPrice
                        }"
                        >{{ item.price }}</span
                      >
                    </div>
                    <div class="font-s red" v-if="item.price > item.showPrice">
                      优惠价：{{ item.showPrice }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="goods-sku font-s">
                      价格：
                      <span
                        :class="{
                          'delete-line': item.price > item.calculatePrice,
                          red: item.price <= item.calculatePrice
                        }"
                        >{{ item.price }}</span
                      >
                    </div>
                    <div
                      class="font-s red"
                      v-if="item.price > item.calculatePrice"
                    >
                      优惠价：{{ item.calculatePrice }}
                    </div>
                  </template>

                  <div
                    class="font-s"
                    @click="showCouponListAction(item)"
                    v-if="item.strategies"
                  >
                    更多优惠 >
                  </div>

                  <div class="goods-step">
                    <van-stepper
                      integer
                      :min="1"
                      @blur="itemNumChange($event, item)"
                      @minus="itemNumChange($event, item, 'minus')"
                      @plus="itemNumChange($event, item, 'plus')"
                      :value="item.productCount"
                    />
                    <!--<i-->
                    <!--class="delete iconfont iconshanchu"-->
                    <!--@click="deleteItem(item)"-->
                    <!--&gt;</i>-->
                  </div>
                </div>
              </van-cell>
            </van-checkbox>
          </div>
        </div>
      </section>

      <!--未选中商品-->
      <div v-for="item in unSelectedGoodsClass" class="strategie">
        <van-cell
          class="active-title"
          :clickable="false"
          v-if="!item.noStrategy"
        >
          <template slot="title">
            <template>
              <span class="recommend-card">促销</span>
              <span
                class="active-name unuse-active"
                v-for="strate in item.strategies"
                @click="showCouponAction(strate)"
                >{{ strate.title }}</span
              >
            </template>
          </template>
        </van-cell>

        <van-checkbox
          class="card-goods__item"
          v-for="pro in item.products"
          :key="pro.id"
          :name="pro.id"
          :label-disabled="true"
        >
          <van-cell class="mb10 goods-box">
            <img :src="pro.imagesUrl" :alt="pro.name" class="goods-img" />
            <div class="goods-desc">
              <div class="goods-name-box">
                <div class="goods-name">{{ pro.name }}</div>
              </div>
              <div class="goods-sku font-s">
                价格：
                <span
                  :class="{
                    'delete-line': pro.price > pro.showPrice,
                    red: pro.price <= pro.showPrice
                  }"
                  >{{ pro.price }}</span
                >
              </div>
              <div class="font-s red" v-if="pro.price > pro.showPrice">
                优惠价：{{ pro.showPrice }}
              </div>
              <!--<div-->
              <!--class="font-s"-->
              <!--@click="showCouponListAction(item)"-->
              <!--v-if="item.strategies"-->
              <!--&gt;-->
              <!--更多优惠 >-->
              <!--</div>-->
              <div class="goods-step">
                <van-stepper
                  integer
                  :min="1"
                  @blur="itemNumChange($event, pro)"
                  @minus="itemNumChange($event, pro, 'minus')"
                  @plus="itemNumChange($event, pro, 'plus')"
                  :value="pro.productCount"
                />
                <!--<i-->
                <!--class="delete iconfont iconshanchu"-->
                <!--@click="deleteItem(item)"-->
                <!--&gt;</i>-->
              </div>
            </div>
          </van-cell>
        </van-checkbox>
      </div>
    </van-checkbox-group>

    <!--提交按钮-->
    <van-submit-bar
      :price="bestPlan.totalPrice * 100 || 0"
      label="总价"
      :tip="
        bestPlan.saveMoney > 0
          ? `周大福最优活动推荐已为您节省${bestPlan.saveMoney}元`
          : ''
      "
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >
      <van-checkbox v-model="allChecked" class="all-checked">全选</van-checkbox>
    </van-submit-bar>

    <!-- 更多活动选择 -->
    <van-popup v-model="showCouponList" position="bottom">
      <active-list
        :product="currentProduct"
        @selectedActive="selectedActive($event)"
      ></active-list>
    </van-popup>

    <!--活动详细策略展示-->
    <van-popup v-model="showCoupon" position="bottom">
      <van-cell>
        <span class="coupon-title">{{ currentCoupon.title }}</span>
      </van-cell>
      <van-cell v-for="(rule, index) in currentCoupon.rules" :key="index">
        {{ rule.policyName }}
      </van-cell>
    </van-popup>
  </div>
</template>

<script>
import DataList from '@femessage/data-list'
import {Checkbox, CheckboxGroup, Card, SubmitBar, Stepper} from 'vant'
import noResults from '@/container/cart/no-results'
import AppointmentTip from '@/container/cart/appointment-tip'
import ActiveList from '@/container/cart/active-list'
import {shoppingCarts, setCartGoods, deleteProduct} from '@/const/api.js'
import {INDEX, CONFIRM_ORDER} from '@/const/path.js'
import {mapActions, mapState, mapMutations} from 'vuex'
import {
  getExchange,
  calculate1,
  calculate2,
  calculate3,
  calculate4,
  calculate5,
  calculate6
} from '@/const/cart.js'

const ON_STATUS = 'on'
const PLUS_KEY = 'plus'
const MINUS_KEY = 'minus'
const TRATEGIE_TYPE_NAME = {
  '-1': '会员价',
  0: '买高送低',
  1: '满额减额',
  2: '买件送件',
  3: '满额打折',
  4: '单品打折'
}
export default {
  layout: 'layout-with-footer',
  components: {
    'van-card': Card,
    'van-checkbox': Checkbox,
    'van-submit-bar': SubmitBar,
    'van-checkbox-group': CheckboxGroup,
    'van-stepper': Stepper,
    DataList,
    noResults,
    AppointmentTip,
    ActiveList
  },

  head() {
    return {
      title: '购物车'
    }
  },

  data() {
    return {
      listConfig: {
        dataPath: 'payload.content',
        totalPagesPath: 'payload.totalPages',
        hasPagination: true,
        url: shoppingCarts
      },
      on_status: ON_STATUS,
      checkedGoods: [],
      numLoading: false,
      bestPlan: [],
      showCouponList: false,
      currentProduct: [],
      showCoupon: false,
      currentCoupon: {},
      unSelectedGoodsClass: []
    }
  },

  created() {
    this.getCartNum(this.userId)
    this.allChecked = true
  },

  computed: {
    ...mapState('cart', ['cartGoods']),
    ...mapState(['sale', 'userId']),
    submitBarText() {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },
    allChecked: {
      get: function() {
        return this.cartGoodsCopy.length > 0
          ? this.checkedGoods.length === this.cartGoodsCopy.length
          : false
      },
      // setter
      set: function(newValue) {
        newValue
          ? (this.checkedGoods = this.cartGoodsCopy.map(item => item.id))
          : (this.checkedGoods = [])
      }
    },
    cartGoodsCopy() {
      let copy = JSON.parse(JSON.stringify(this.cartGoods))
      copy.forEach(item => {
        item.useStrategies = item.strategies
          ? JSON.parse(JSON.stringify(item.strategies))
          : []
      })
      return copy
    }
  },
  watch: {
    checkedGoods() {
      this.getBestPlan()
      this.classUnSelectedGoods()
    },
    cartGoods() {
      this.getBestPlan()
    }
  },
  methods: {
    ...mapActions('cart', ['getCartNum']),
    ...mapMutations('confirm-order', ['bestPlanUpdate']),
    /**
     * 获取最优方案
     */
    getBestPlan() {
      this.bestPlan = []
      if (this.checkedGoods.length <= 0) return false
      // 生成方案数组
      let exchangeObjArr = this.setActiveProductArr()
      // 计算各方案总金额
      exchangeObjArr.forEach(item => {
        this.calculateMoney(item)
      })

      exchangeObjArr.sort(compare)
      function compare(v1, v2) {
        if (v1.totalPrice - v1.virtualPrice < v2.totalPrice - v2.virtualPrice) {
          return -1
        } else {
          return 0
        }
      }
      // console.log(exchangeObjArr, 666)
      this.bestPlan = exchangeObjArr[0]
    },

    /**
     * 根据选中商品生成参与活动计算的数组
     */
    setCheckedGoodsActiveArr() {
      let products = []
      this.checkedGoods.forEach(item => {
        products.push(JSON.parse(JSON.stringify(this.findProductById(item))))
      })
      // 将会员价生成为策略放入策略数组，将商品信息放入策略中
      let strategieArr = []
      products.forEach(item => {
        const copyItem = JSON.parse(JSON.stringify(item))
        if (
          !item.useStrategies.some(stra => stra.type === -1) &&
          !item.userSelectedActive
        ) {
          item.useStrategies.push({
            type: -1,
            strategyId: 'level',
            activityId: 'level'
          })
        }
        item.useStrategies.forEach(i => {
          i.products = [copyItem]
        })

        strategieArr.push(item.useStrategies)
      })
      return strategieArr
    },

    /**
     * 归类各策略下商品
     */
    setActiveProductArr() {
      // 生成活动方案排列组合数组
      let exchangeArr = getExchange(this.setCheckedGoodsActiveArr())
      // 根据排列组合归类策略下的商品
      let exchangeMergeArr = exchangeArr.map(item => this.classify(item))
      // 生成方案对象
      let exchangeObjArr = exchangeMergeArr.map(item => {
        return {
          strategieArr: item,
          totalPrice: 0,
          saveMoney: 0,
          virtualPrice: 0
        }
      })
      return exchangeObjArr
    },

    /**
     * 归类商品
     * @param arr
     */
    classify(arr) {
      let ids = []
      let newArr = []
      arr.forEach(item => {
        let index = ids.indexOf(item.strategyId)
        if (index === -1) {
          ids.push(item.strategyId)
          newArr.push(item)
        }
        if (index > -1) {
          newArr[index].products.push(item.products[0])
        }
      })
      return newArr
    },

    /**
     * 计算总金额
     */
    calculateMoney(obj) {
      const {strategieArr} = obj
      strategieArr.forEach(item => {
        // totalPrice: 实际支付总金额, saveMoney: 实际节省金额, virtualPrice: 买件送件类虚拟优惠金额
        let result = {totalPrice: 0, saveMoney: 0, virtualPrice: 0}
        // 根据各促销类型计算价格
        switch (Number(item.type)) {
          case 0: // 买高送低
            result = calculate1(item)
            break
          case 1: // 满额减额
            result = calculate2(item)
            break
          case 2: // 买件送件
            result = calculate3(item)
            break
          case 3: // 满额打折
            result = calculate4(item)
            break
          case 4: // 单品打折
            result = calculate6(item)
            break
          case -1: // 会员价
            result = calculate5(item)
            break
        }
        obj.totalPrice += Number(result.totalPrice)
        obj.saveMoney += Number(result.saveMoney)
        obj.virtualPrice += result.virtualPrice ? result.virtualPrice : 0
      })
      obj.totalPrice = Number(obj.totalPrice.toFixed(2))
      obj.saveMoney = Number(obj.saveMoney.toFixed(2))
      obj.virtualPrice = Number(obj.virtualPrice.toFixed(2))
    },

    loadedData() {},
    showCouponListAction(product) {
      this.currentProduct = product
      this.showCouponList = true
    },
    showCouponAction(coupon) {
      this.showCoupon = true
      this.currentCoupon = coupon
    },
    selectedActive(strategy) {
      let pro = this.findProductById(this.currentProduct.id)
      pro.useStrategies = [strategy]
      pro.userSelectedActive = true
      this.showCouponList = false
      this.getBestPlan()
    },
    getStrategieTypeName(type) {
      return TRATEGIE_TYPE_NAME[type]
    },
    itemNumChange(e, item, type) {
      let currNum = item.productCount
      if (e) {
        currNum = e.target.value
      } else {
        type === PLUS_KEY && currNum++
        type === MINUS_KEY && currNum--
      }
      // if (currNum > item.availableStock) {
      //   this.$toast.fail('数量超出商品库存')
      //   item.productCount = new Number(item.productCount)
      //   return false
      // }
      this.setProductNum(currNum, item)
    },
    setProductNum(num, item) {
      this.$toast.loading({
        duration: 0,
        message: '',
        forbidClick: true
      })

      //新逻辑

      const query = {
        filter: {userId: this.userId, code: item.code},
        body: {productCount: num}
      }
      this.$axios
        .put(setCartGoods, query)
        .then(res => {
          item.productCount = num
          // this.getCartNum(this.userId)
          this.findProductById(item.id).productCount = num
          this.getBestPlan()
          this.$toast.clear()
        })
        .catch(err => {
          this.$toast.clear()
          this.$toast.fail('修改失败')
        })
    },
    findProductById(id) {
      let item = {}
      if (!this.cartGoodsCopy) return item
      for (let pro of this.cartGoodsCopy) {
        if (pro.id === id) {
          item = pro
          break
        }
      }
      return item
    },
    // 归类未选中商品
    classUnSelectedGoods() {
      this.unSelectedGoodsClass = []
      let unSelectedGoods = []
      this.cartGoodsCopy.forEach(pro => {
        if (!this.isOnChecked(pro.id)) {
          unSelectedGoods.push(pro)
        }
      })
      let ids = []
      let noStrategyPro = []
      unSelectedGoods.forEach(pro => {
        if (pro.strategies) {
          let itemIds = ''
          pro.strategies.forEach(item => {
            itemIds += item.activityId
          })
          let index = ids.indexOf(itemIds)
          if (index > -1) {
            this.unSelectedGoodsClass[index].products.push(pro)
          } else {
            ids.push(itemIds)
            this.unSelectedGoodsClass.push({
              strategies: pro.strategies,
              products: [pro]
            })
          }
        } else {
          noStrategyPro.push(pro)
        }
      })
      noStrategyPro.length > 0 &&
        this.unSelectedGoodsClass.push({
          noStrategy: true,
          products: noStrategyPro
        })
    },
    onSubmit() {
      let copyBest = JSON.parse(JSON.stringify(this.bestPlan))
      copyBest.strategieArr.forEach(item => {
        item.products.forEach(i => {
          if (i.giveNum && i.giveNum > 0) {
            let copPro = JSON.parse(JSON.stringify(i))
            copPro.productCount = i.giveNum
            copPro.isGive = true
            delete copPro.giveNum
            item.products.push(copPro)
          }
        })
      })

      this.bestPlanUpdate(copyBest)

      this.$router.replace({path: CONFIRM_ORDER})
    },
    goMall() {
      this.$router.push({path: INDEX})
    },
    isOnChecked(id) {
      return this.checkedGoods.some(item => item === id)
    },
    deleteItem(item) {
      const that = this
      function beforeClose(action, done) {
        if (action === 'confirm') {
          that.$axios
            .delete(deleteProduct(item.id))
            .then(res => {
              done()
              const index = that.$refs.dataList.list.indexOf(item)
              const indexChecked = that.checkedGoods.indexOf(item.id)
              if (indexChecked > -1) that.checkedGoods.splice(indexChecked, 1)
              that.$refs.dataList.list.splice(index, 1)
              that.loadedData()
              that.getCartNum()
            })
            .catch(err => {
              done()
              that.$toast.fail('删除失败')
            })
        } else {
          done()
        }
      }
      this.$dialog.confirm({
        title: '确认提示',
        message: '确认删除该商品吗？',
        beforeClose
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.cart {
  background-color: #f2f2f2;
  min-height: calc(100vh - 100px);
  padding-bottom: 88px;

  .active-tip-content {
    background-color: rgba(230, 2, 111, 0.1);
    padding: 8px 15px;
    line-height: 14px;
  }

  .active-tip {
    width: 90%;
    display: inline-block;
    font-weight: 400;
    color: $primary-color;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .van-icon {
      vertical-align: bottom;
    }
  }

  .more-action {
    float: right;
    color: #848484;
  }

  .mall {
    margin-bottom: 10px;

    .van-cell__value {
      flex: 2;
      color: #666;
    }

    .custom-icon {
      line-height: 24px;
    }
  }

  .card-goods {
    &__item {
      position: relative;
      background-color: #fff;

      .van-checkbox__label {
        width: 100%;
        height: auto;
        padding: 0;
        box-sizing: border-box;
      }

      .van-checkbox__icon {
        top: 50%;
        left: 15px;
        z-index: 1;
        position: absolute;
        margin-top: -10px;
      }

      .van-card__price {
        color: #f44;
      }
    }
  }

  .goods-box {
    line-height: unset;
    height: 128px;
    padding: 10px 15px 10px 25px;

    .van-cell__value {
      display: flex;
    }

    .goods-img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      margin-right: 10px;
      display: inline-block;
    }

    .delete-line {
      text-decoration: line-through;
    }
  }

  .bt-m {
    border-bottom: 10px solid #f2f2f2;
  }

  .goods-desc {
    /* width: 100%; */
    flex: 1;
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
      width: 100%;

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

    .delete {
      position: absolute;
      right: 0;
      top: 0;
    }

    .out-num {
      position: absolute;
      left: 100px;
      top: 0;
    }
  }

  .van-submit-bar {
    bottom: 50px;
  }

  .all-checked {
    padding-left: 15px;
  }

  .red {
    color: $primary-color;
  }

  .strategie {
    background-color: #fff;
    margin-bottom: 10px;
  }

  .active-title {
    padding: 5px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;

    .van-cell__title {
      display: flex;
      width: 100%;
    }

    .type-card {
      padding: 0 5px;
      border: 1px solid #ee7c1b;
      color: #ee7c1b;
      display: inline-block;
      margin-right: 8px;
    }

    .recommend-card {
      color: #fff;
      padding: 0 5px;
      display: inline-block;
      background-color: #c33d58;
    }

    .active-name {
      flex: 0.9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ccc;
      font-size: 12px;
      margin-left: 6px;
      display: inline-block;
    }

    .unuse-active {
      text-decoration: underline;
      color: #666;
    }
  }

  .coupon-title {
    color: $primary-color;
    font-weight: 400;
  }
}
</style>
