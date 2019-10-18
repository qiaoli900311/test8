<template>
  <li class="list-item">
    <div class="item-head font-l">
      <div class="order-time">
        {{ item.date | formatDateTime('YYYY-MM-DD HH:mm') }}
      </div>
      <div class="order-status">
        {{ orderStatusKey[item.status] }}
      </div>
    </div>
    <van-cell
      class="goods-box"
      v-for="(pro, index) in item.products"
      :key="index"
    >
      <img :src="pro.imagesUrl" :alt="pro.name" class="goods-img" />
      <div class="goods-desc">
        <div class="goods-name-box">
          <div class="goods-name">{{ pro.name }}</div>
          <div class="red" v-if="pro.isGive">
            赠品
          </div>
        </div>

        <!--<div class="goods-sku font-s">-->
        <!--优惠价：<span-->
        <!--class="red"-->
        <!--&gt;{{ pro.actualPrice }}</span>-->
        <!--</div>-->

        <div class="goods-sku font-s">数量：{{ pro.productCount }}</div>
      </div>
    </van-cell>
    <div class="item-bottom">
      <div class="total-info">
        <span>{{ `订单号${item.order_no}，合计:` }}</span
        ><span class="total-money">{{ item.order_price | price }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import {
  TAB_LIST,
  STATUS_OBJ,
  ORDER_STATUS,
  BUTTON_TYPE,
  ALL_STATUS,
  ORDER_TYPE
} from '@/const/order.js'

import {ORDER_DETAIL} from '@/const/path.js'

import commodityInfo from '@/components/order/commodity-info'

import {getPayDetail} from '@/const/api.js'
import paymentRequest from 'xpaas-payment-request'
import {PAY_RESULT_SUCCESS} from '@/const/path.js'
import {PAYMENT_PROXY_URL} from '@/const/common.js'

export default {
  components: {
    commodityInfo
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          productInfoDTO: {}
        }
      }
    }
  },
  data() {
    return {
      orderStatusKey: ORDER_STATUS,
      ALL_STATUS
    }
  },
  methods: {}
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.list-item {
  padding: 0 15px 15px 15px;
  margin-bottom: 10px;
  background: #fff;

  .red {
    color: $primary-color;
  }

  .item-head {
    height: 40px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    border-bottom: 1px solid $input-border-color;

    .order-status {
      color: $primary-color;
    }
  }

  .item-bottom {
    padding-top: 10px;
    text-align: right;

    .total-money {
      color: $primary-color;
    }

    .button-list {
      padding-top: 10px;
      align-items: center;
      justify-content: flex-end;
      display: flex;

      .button {
        height: 25px;
        width: 80px;
        line-height: 23px;
        text-align: center;
        border: 1px solid #b5b3b3;
        border-radius: 13px;
        margin-left: 10px;
        box-sizing: border-box;

        &-order {
          color: #fff;
          border-color: $primary-color;
          background: $primary-color;
        }
      }
    }
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

    .delete-line {
      text-decoration: line-through;
    }

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
}
</style>
