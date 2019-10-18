<template>
  <div class="coupon-list">
    <van-tabs
      v-model="tabActive"
      :line-width="tabWidth"
      :line-height="lineHeight"
      :swipeable="true"
      :animated="true"
      :sticky="true"
    >
      <van-tab :title="`${tagList[0].tagName}(${canUse.length})`">
        <div
          class="coupon-data"
          :style="{'padding-top': showTip ? '22px' : '8px'}"
        >
          <div class="tip font-s" v-if="showTip">
            <div>
              已为你选择推荐组合，使用优惠券
              <span class="red">{{ selectResult.length }}</span> 张
            </div>
            <div @click="showTip = false">
              <icon-font icon="iconshibai"></icon-font>
            </div>
          </div>

          <!--<div class="selectAll" v-if="canUse.length > 0">-->
          <!--<van-checkbox ref="checkbox" v-model="selectAll">全选</van-checkbox>-->
          <!--<div class="shadow" @click="selectAllHandle"></div>-->
          <!--</div>-->

          <ul v-if="canUse.length > 0">
            <van-checkbox-group
              v-model="selectResult"
              @change="couponChange($event)"
            >
              <li v-for="(item, index) in canUse" :key="index">
                <coupon-item v-bind="item" :showSelect="true"></coupon-item>
              </li>
            </van-checkbox-group>
          </ul>
          <p v-if="canUse.length <= 0" class="coupon-no-result">- 没有记录 -</p>
        </div>
      </van-tab>

      <van-tab :title="`${tagList[1].tagName}(${cantUse.length})`">
        <div class="coupon-data">
          <ul v-if="cantUse.length > 0">
            <van-checkbox-group v-model="selectResult">
              <li v-for="(item, index) in cantUse" :key="index">
                <coupon-item v-bind="item" :showSelect="false"></coupon-item>
              </li>
            </van-checkbox-group>
          </ul>
          <p v-if="cantUse.length <= 0" class="coupon-no-result">
            - 没有记录 -
          </p>
        </div>
      </van-tab>
    </van-tabs>

    <div class="confirmButton" @click="onSubmit">确定</div>
  </div>
</template>

<script>
import IconFont from '@/components/icon-font'
import CouponItem from '@/container/confirm-order/coupon-item.vue'

import DataList from '@femessage/data-list'

import {Checkbox, checkboxGroup} from 'vant'

import {confirmCouponListUrl} from '@/const/api.js'

import {couponStatus} from '@/const/coupon.js'

const MAIN_REF = 'dataList0'

export default {
  components: {
    IconFont,
    CouponItem,
    DataList,
    'van-checkbox-group': checkboxGroup,
    'van-checkbox': Checkbox
  },
  props: {
    productId: {
      type: String
    },
    categoryCode: {
      type: String
    },
    canUse: {
      type: Array
    },
    cantUse: {
      type: Array
    }
  },
  data() {
    return {
      selectResult: [],
      selectAll: false,
      lineHeight: 2,
      baseListConfig: {
        dataPath: 'payload',
        totalPagesPath: '',
        hasPagination: false,
        saveQuery: false,
        url: null
      },
      query: {
        status: couponStatus.wait_use,
        productId: this.productId,
        categoryCode: this.categoryCode
      },
      tagList: [
        {
          tagName: '可用优惠券',
          tagId: 1
        },
        {
          tagName: '不可用优惠券',
          tagId: 2
        }
      ],
      tabActive: 0,
      showTip: false,
      isChanged: false
    }
  },
  watch: {
    selectResult(val) {
      this.selectAll = val.length === this.canUse.length
    }
  },
  computed: {
    tabWidth() {
      return document.documentElement.clientWidth / this.tagList.length - 40
    }
  },
  mounted() {
    let bestArr = []
    let best = null
    this.canUse.forEach(item => {
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
      this.showTip = true
      this.selectResult = bestArr
    }
  },
  methods: {
    onSubmit() {
      this.$emit('selectedCouponHandle', this.selectResult)
    },
    selectAllHandle() {
      // 全选按钮
      this.selectAll = !this.selectAll

      this.selectResult = (this.selectAll ? this.canUse : []).map(
        item => item.code
      )
    },
    couponChange() {
      if (!this.isChanged) {
        let newArr = []
        let mutexItem = null
        this.selectResult.forEach(code => {
          this.canUse.forEach(item => {
            if (code === item.code && !item.isMutex) newArr.push(code)
            if (code === item.code && item.isMutex) mutexItem = item
          })
        })
        if (mutexItem) newArr.push(mutexItem.code)
        this.selectResult = newArr

        this.isChanged = true
        this.showTip = false
        setTimeout(() => {
          this.isChanged = false
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.coupon-list {
  height: 100vh;
  background: $bg-color;
  overflow-y: auto;

  .coupon-data {
    position: relative;
    padding-top: 8px;
    padding-bottom: 100px;
  }

  .tip {
    width: 100vw;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    padding: 0 10px 0 15px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    box-sizing: border-box;
  }

  .confirmButton {
    width: 100vw;
    height: 50px;
    line-height: 50px;
    background: $primary-color;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #fff;
    z-index: 99999;
  }

  .selectAll {
    display: flex;
    justify-content: flex-end;
    width: 92%;
    margin: 0 auto;
    position: relative;

    .shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .van-checkbox__icon .van-icon {
    border-color: $primary-color;
  }

  .red {
    color: $primary-color;
  }
}
</style>
