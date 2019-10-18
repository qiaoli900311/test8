<template>
  <div class="store-item">
    <div class="store-title font-l">{{ title }}</div>
    <div class="desc-box">
      <div class="desc-item font-m">
        <icon-font icon="iconmendiandizhi"></icon-font>
        <div class="address">{{ address }}</div>
        <span class="distance">距离{{ distance }}m</span>
      </div>
      <div class="desc-item font-m">
        <icon-font icon="iconyingyeshijian"></icon-font>营业时间：{{ time }}
      </div>
      <div class="desc-item font-m">
        <icon-font icon="iconzixunshi"></icon-font>门店咨询师
        <span class="total">({{ avatarList.length }})</span>
      </div>
      <div class="avatar-box">
        <img :src="img.avatar" v-for="img in avatarList" :key="img.id" />
      </div>
    </div>
    <div class="tools font-m">
      <div class="btn" @click="toReservation">立即预约</div>
      <div class="btn" @click="handleCall">联系门店</div>
    </div>

    <phone-confirm ref="phone"></phone-confirm>
  </div>
</template>

<script>
import IconFont from '@/components/icon-font'
import phoneConfirm from '@/container/phone-confirm.vue'
import {RESERVATION_SELECT} from '@/const/path.js'

export default {
  components: {
    IconFont,
    phoneConfirm
  },
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    address: {
      type: String
    },
    distance: {
      type: [String, Number]
    },
    time: {
      type: String
    },
    avatarList: {
      type: Array
    },
    phone: {
      type: [String, Number]
    }
  },
  methods: {
    handleCall() {
      this.$refs.phone.show()
    },
    toReservation() {
      this.$router.push({
        path: RESERVATION_SELECT
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.store-item {
  padding: 0 0 10px 15px;
  text-align: left;
  background: $white;
  margin-top: 8px;

  .store-title {
    padding: 15px 0 5px 5px;
    padding-left: 5px;
    color: #030303;
    font-weight: bold;
  }

  .desc-box {
    padding: 15px 0;
  }

  .store-title,
  .desc-box {
    border-bottom: 1px solid rgba(238, 238, 238, 1);
  }

  .desc-item {
    color: $text-gray;
    margin-bottom: 5px;
    display: flex;
    align-items: center;

    i {
      color: $primary-color;
      margin-right: 6px;
    }

    .address {
      max-width: 220px;
    }
  }

  .avatar-box {
    display: flex;
    justify-content: flex-start;

    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  .tools {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    margin-left: -15px;

    .btn {
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 15px;
      color: $primary-color;
      border: 1px solid $primary-color;
      box-sizing: border-box;
      transition: background 0.3s ease;

      &:active {
        background: rgba(229, 0, 134, 0.1);
      }
    }

    .btn:first-child {
      margin-right: 10px;
    }
  }

  .distance {
    color: #6495fe;
    margin-left: 25px;
  }

  .total {
    color: $primary-color;
    margin-left: 8px;
  }
}
</style>
