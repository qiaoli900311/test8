<template>
  <div class="commodity-info">
    <div class="img-box">
      <img :src="commodity.imagesUrl" alt="暂无图片" />
    </div>
    <div class="info-box">
      <div class="name flex-between-center font-l">
        <div class="commodity-title">
          <div class="text">{{ commodity.title || commodity.name }}</div>
        </div>
        <div class="price" v-if="isDetail">
          {{ commodity.realProductPrice | price }}
        </div>
      </div>
      <div class="midlle-info flex-between-center font-m" v-if="!isDetail">
        <div class="left">{{ commodity.specification }}</div>
        <div class="right" v-if="totalDiscountAmount > 0">
          省{{ totalDiscountAmount | price }}
        </div>
      </div>
      <div class="midlle-info flex-between-center font-m" v-if="isDetail">
        <div class="left">{{ commodity.specification }}</div>
        <div class="right">×{{ commodity.productCount || productCount }}</div>
      </div>
      <div
        :class="[
          isDetail && 'text-right',
          'bottom-info',
          'flex-between-center'
        ]"
      >
        <div class="price-info" v-if="!isDetail">
          <span class="discount-price font-l">{{
            commodity.realProductPrice | price
          }}</span>
          <span class="original-price font-s">{{
            commodity.productPrice | price
          }}</span>
        </div>
        <div class="amount" v-if="!isDetail">
          ×{{ commodity.productCount || productCount }}
        </div>
        <div
          class="discouns-right font-l"
          v-if="isDetail && totalDiscountAmount > 0"
        >
          ﹣{{ totalDiscountAmount | price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const PRODUCT_COUNT = 1
export default {
  props: {
    /**
     * 商品信息
     */
    totalAmount: {
      type: Number,
      default: 0
    },
    totalDiscountAmount: {
      type: Number,
      default: 0
    },
    realPayAmount: {
      type: Number,
      default: 0
    },
    commodity: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 是否位于订单详情中展示
     */
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productCount: PRODUCT_COUNT
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/var.styl';

.commodity-info {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid $input-border-color;

  .img-box {
    flex: 0 0 90px;
    height: 90px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .text-right {
    justify-content: flex-end;
  }

  .info-box {
    flex: 1;
    padding-left: 7px;
    text-align: left;

    .name {
      .commodity-title {
        height: 44px;
        line-height: 22px;
        overflow: hidden;

        .text {
          float: right;
          margin-left: -5px;
          width: 100%;
          word-break: break-all;
        }

        &::before {
          float: left;
          width: 5px;
          content: '';
          height: 44px;
        }

        &::after {
          float: right;
          content: "...";
          height: 22px;
          line-height: 22px;
          width: 3em;
          margin-left: -3em;
          position: relative;
          left: 100%;
          top: -22px;
          padding-right: 5px;
          background-color: #fff;
        }
      }
    }

    .midlle-info {
      padding: 8px 0 10px 0;

      .left {
        color: $text-gray;
      }

      .right {
        color: $gray;
      }
    }

    .bottom-info {
      .price-info {
        .discount-price {
          color: $primary-color;
        }

        .original-price {
          text-decoration: line-through;
          color: $placeholder-color;
        }
      }

      .discouns-right {
        color: $primary-color;
      }
    }
  }
}
</style>
