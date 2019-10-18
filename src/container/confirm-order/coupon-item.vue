<template>
  <coupon-item class="coupon-item" :state="state" @click.native="itemHandle">
    <template slot="couponLeft" slot-scope="status">
      <div class="money">
        <span class="money-unit font-s">￥</span>
        <span class="money-num" :class="{'font-28': discountPrice > 999}">{{
          discountPrice
        }}</span>
      </div>
      <p class="condition font-s">满{{ limitPrice }}元使用</p>
    </template>
    <template slot="couponRight">
      <div class="select-box" v-if="showSelect">
        <van-checkbox
          :name="code"
          ref="checkbox"
          :checked-color="primaryColor"
        ></van-checkbox>
      </div>
      <!-- 优惠券名称 -->
      <p class="font-s">{{ name }}</p>
      <!-- 有效期 -->
      <p class="font-s">
        有效期：{{ startDate | formatDateTime }}~{{ endDate | formatDateTime }}
      </p>
      <!--描述-->
      <!--<p class="font-s">{{ categoryName }} {{brandName}} {{limitPrice}}</p>-->
      <!--其他说明-->
      <p class="font-s red" v-if="!disReason && isMutex">不与其他优惠券同享</p>
      <!--不可用原因-->
      <p class="font-s red" v-if="disReason">{{ disReason }}</p>
    </template>
  </coupon-item>
</template>

<script>
import CouponItem from '@/container/coupon.vue'
import {couponStatus} from '@/const/coupon.js'
import dayjs from 'dayjs'

import {Checkbox} from 'vant'

const a = {
  code: '1234', // 编码
  name: '雅顿8元抵用券', // 名称
  discountPrice: 8, // 优惠金额
  startDate: '2019/05/28', // 有效开始日期
  endDate: '2019/06/30', // 有效结束日期
  brandName: '', // 限制品牌名（不限制则为空）
  categoryName: '', // 限制分类名（不限制则为空）
  canUseNum: 1, // 每个订单能用数量
  limitPrice: 500, // 限制金额（满xx元才能用），不限制则为0
  isMutex: true, // 是否互斥，是则不能与其他优惠券一起使用
  number: 1, // 用户拥有数量
  userId: 'fsfsgsg1' // 用户id
}

export default {
  components: {
    CouponItem,
    'van-checkbox': Checkbox
  },
  // TODO: 优惠券接口字段还没确定，需要根据字段修改
  props: {
    // 优惠券id
    code: {
      type: String
    },
    // 优惠金额
    discountPrice: {
      type: Number
    },
    // 使用条件
    limitPrice: {
      type: [String, Number]
    },
    startDate: {
      type: [String, Number]
    },
    endDate: {
      type: [String, Number]
    },
    // 是否展示checkbox
    showSelect: {
      type: Boolean
    },
    // 优惠券促销标语
    name: {
      type: String
    },
    brandName: {
      type: String
    },
    categoryName: {
      type: String
    },
    isMutex: {
      type: Boolean
    },
    // 优惠券状态
    state: {
      type: String,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return couponStatus[value]
      },
      default: 'unused'
    },
    // 不可用原因
    disReason: {
      type: String
    }
  },
  data() {
    return {
      primaryColor: 'rgba(255, 102, 0, 1)'
    }
  },
  methods: {
    itemHandle(e) {
      // 点到checkbox的时候 使用默认事件勾选
      if (this.showSelect && e.target.nodeName != 'I') {
        this.$refs.checkbox.toggle()
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.coupon-item {
  .money {
    height: 40px;
    white-space: nowrap;

    .money-num {
      vertical-align: text-top;
      font-size: 40px;
      line-height: 40px;
    }
  }

  .condition {
    margin: 0;
    line-height: 20px;
    white-space: nowrap;
  }

  .use-button {
    border: none;
    width: 80px;
    height: 25px;
    line-height: 25px;
    border-radius: 25px;
    background-color: $primary-color;
    color: $white;
    padding: 0 10px;
    margin-top: 5px;

    &.van-button--disabled {
      opacity: 1;
      background-color: $button-disable-color;
    }
  }

  .select-box {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .van-checkbox__icon .van-icon {
    border-color: $primary-color;
  }
}
</style>
