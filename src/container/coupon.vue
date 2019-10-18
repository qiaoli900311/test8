<template>
  <van-row
    class="coupon"
    :class="{'disable-coupon': disableCoupon}"
    type="flex"
    justfy="space-between"
  >
    <div class="van-hairline--surround">
      <van-col class="coupon-item__left">
        <slot name="couponLeft" v-bind="status"></slot>
      </van-col>
      <van-col class="coupon-item__right">
        <div class="van-hairline--left"></div>
        <slot name="couponRight"></slot>
      </van-col>
    </div>
  </van-row>
</template>

<script>
import {couponStatus} from '@/const/coupon.js'
export default {
  name: 'coupon',
  props: {
    state: {
      type: String,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return couponStatus[value]
      },
      default: 'unused'
    }
  },
  data() {
    return {
      status: couponStatus
    }
  },
  computed: {
    disableCoupon() {
      return (
        this.state === this.status.used || this.state === this.status.expried
      )
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.coupon {
  width: 92%;
  min-height: 124px;
  margin: 10px auto 0;
  position: relative;

  .coupon-item__left,
  .coupon-item__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .coupon-item__left {
    width: 32.6%;
    height: 100%;
    background-color: #fef6fa;
    box-sizing: border-box;
    padding: 15px 15px 15px 10px;
    color: $primary-color;
    text-align: center;
    align-items: center;
    position: relative;

    &::after,
    &::before {
      content: '';
      display: block;
      width: 40px;
      height: 20px;
      background-color: $bg-color;
      pointer-events: none;
      box-sizing: border-box;
      border: 0 solid #f17bb4;
      position: absolute;
      z-index: 10;
      right: 0;
    }

    &::before {
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
      top: 0;
      border-width: 0 1px 1px 1px;
      transform: translate(50%, -25%) scale(0.5);
    }

    &::after {
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      border-width: 1px 1px 0 1px;
      bottom: -1px;
      transform: translate(50%, 25%) scale(0.5);
    }
  }

  .coupon-item__right {
    width: 67.4%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 15px 10px 15px;
    text-align: left;
    color: #666;
    position: relative;

    > p {
      margin: 3px 0 0;
    }

    .van-hairline--left {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 5;

      &::after {
        border-color: #fbdceb;
        border-style: dashed;
      }
    }
  }

  .van-hairline--surround {
    width: 100%;

    &::after {
      border-color: #f17bb4;
    }
  }

  .font-28 {
    font-size: 28px !important;
  }

  &.disable-coupon {
    .coupon-item__left {
      background-color: #f6f6f6;
      color: #999;

      &::after,
      &::before {
        border-color: #dcdcdc;
      }
    }

    .coupon-item__right {
      color: #bbb;

      .title {
        color: #bbb;
      }

      .van-hairline--left {
        &::after {
          border-color: #f3dce7;
        }
      }
    }

    .van-hairline--surround {
      &::after {
        border-color: #dcdcdc;
      }
    }
  }
}
</style>
