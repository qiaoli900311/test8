<template>
  <coupon-item class="coupon-item" :couponStatus="couponStatus">
    <template slot="couponLeft" slot-scope="status">
      <div class="money">
        <template v-if="reducePriceType !== reduceType.discount">
          <span class="money-unit font-s">￥</span>
          <span class="money-num" :class="{'font-28': faceValue > 999}">{{
            faceValue
          }}</span>
        </template>

        <span class="money-num" v-if="reducePriceType === reduceType.discount"
          >{{ faceValue * 10 }}折</span
        >
      </div>
      <p class="condition font-s" v-if="moneySize">满{{ moneySize }}元使用</p>
      <!-- <van-button
        class="use-button font-m"
        :disabled="couponStatus !== status.wait_use"
        @click="$emit('buttonClick', $props)"
      >
        立即使用
      </van-button> -->
    </template>
    <template slot="couponRight">
      <p class="title font-n" v-if="couponName">{{ couponName }}</p>
      <!-- 有效期 -->
      <p class="font-s">
        有效期：{{ validStartTime | formatDateTime(dateFormat) }}-{{
          validEndTime | formatDateTime(dateFormat)
        }}
      </p>
      <!-- 其他描述 -->
      <p class="font-s" v-if="inviteMemberName">
        邀请人：{{ inviteMemberName }}
        {{ validStartTime | formatDateTime(dateFormat) }}
      </p>
      <p class="font-s">{{ couponTitle }}</p>
    </template>
  </coupon-item>
</template>

<script>
import CouponItem from './coupon.vue'
import {couponStatus, reduceType} from '@/const/coupon.js'

export default {
  components: {CouponItem},
  // TODO: 优惠券接口字段还没确定，需要根据字段修改
  props: {
    // 优惠券id
    id: {
      type: String
    },
    // 优惠券状态
    couponStatus: {
      type: String,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return couponStatus[value]
      }
    },
    // 优惠金额
    faceValue: {
      type: Number
    },
    // 满{moneySize}元使用
    moneySize: {
      type: [String, Number]
    },
    // 使用条件
    moneySize: {
      type: String
    },
    // 优惠券右侧主标题
    couponName: {
      type: String
    },
    // 优惠券右侧描述
    couponTitle: {
      type: String
    },
    // 邀请人
    inviteMemberName: {
      type: String
    },
    validStartTime: {
      type: [String, Number]
    },
    validEndTime: {
      type: [String, Number]
    },
    reducePriceType: {
      type: String
    }
  },
  data() {
    return {
      reduceType,
      dateFormat: 'YYYY/MM/DD'
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

  .title {
    color: $primary-color;
    margin: 0 !important;
  }
}
</style>
