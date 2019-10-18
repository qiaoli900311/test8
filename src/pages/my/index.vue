<template>
  <div class="my-index">
    <div class="personal-info">
      <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="avator" />
      <img v-else src="../../assets/user.png" class="avator" />
      <div class="user-name-wrapper">
        <div class="user-name">{{ userInfo.userName || '--' }}</div>
        <div class="user-level">
          <icon-font icon="iconvip"></icon-font>
          {{ getLiveName(userInfo.level) || '--' }}
        </div>
      </div>
      <div class="login-out" @click="loginOut">退出</div>
    </div>

    <div class="order-btn-group">
      <div
        v-for="(btnItem, btnIndex) in orderBtnList"
        :key="btnIndex"
        class="order-btn total-orders"
        @click="toOrder(btnItem)"
      >
        <div class="icon-wrapper">
          <icon-font
            :icon="btnItem.icon"
            :style="{fontSize: btnItem.size + 'px'}"
          ></icon-font>
        </div>
        <div class="order-btn-name">{{ btnItem.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ALL_STATUS} from '@/const/order.js'
import IconFont from '@/components/icon-font'
import {LIVE} from '@/const/common.js'
import {mapState} from 'vuex'
import {ORDER_LIST} from '@/const/path.js'

const ORDER_BTN_LIST = [
  {
    title: '全部订单',
    icon: 'iconorder',
    size: '20',
    disabled: false,
    query: {
      status: ALL_STATUS.ALL,
      index: 0
    }
  },
  {
    title: '待付款',
    icon: 'icondaifukuan',
    size: '18',
    disabled: true,
    query: {
      status: ALL_STATUS.CREATE,
      index: 1
    }
  },
  {
    title: '已付款',
    icon: 'icondaifahuo',
    size: '20',
    disabled: true,
    query: {
      status: ALL_STATUS.FINISHED,
      index: 2
    }
  }
]

export default {
  layout: 'layout-with-footer',

  head() {
    return {
      title: '我的'
    }
  },

  components: {
    IconFont
  },

  data() {
    return {
      orderBtnList: ORDER_BTN_LIST
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user
    })
  },

  methods: {
    getLiveName(level) {
      let name = ''
      LIVE.forEach(item => {
        if (item.level === level) {
          name = item.name
        }
      })
      return name
    },
    toOrder(btn) {
      const {query, disabled} = btn
      if (disabled) {
        this.$toast('该功能未发布，敬请期待')
        return
      }

      this.$router.push({
        path: ORDER_LIST,
        query: query
      })
    },
    loginOut() {
      this.$router.replace('/register')
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.my-index {
  width: 100%;
  font-size: 12px;
  color: #666;

  .personal-info {
    display: flex;
    align-items: center;
    height: 54px;
    padding: 13px 15px 13px 18px;
    margin-bottom: 10px;
    background-color: #fff;

    .avator {
      display: inline-block;
      flex: 0 0 54px;
      width: 54px;
      height: 54px;
      border-radius: 28px;
    }

    .user-name-wrapper {
      flex: 1;
      padding-left: 10px;
      vertical-align: middle;

      .user-name {
        line-height: 21px;
        font-size: 15px;
        color: #333;
      }

      .user-level {
        margin-top: 10px;
        vertical-align: middle;
        line-height: 13px;
        font-size: 13px;

        .iconvip {
          margin-right: 3px;
          font-size: 14px;
          color: $primary-color;
        }
      }
    }

    .setting-btn {
      flex: 0 0 45px;
      line-height: 18px;

      .iconfont {
        font-size: 14px;
        vertical-align: middle;
      }

      .desc {
        display: inline-block;
      }
    }

    .login-out {
      color: $primary-color;
    }
  }

  .order-btn-group {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #fff;

    .order-btn {
      position: relative;
      flex: 0 0 33.33%;
      height: 45px;
      padding: 15px 0;
      border-bottom: 1px solid #e8e8e8;
      text-align: center;
      color: #333;

      &::after {
        position: absolute;
        right: 0;
        top: 0;
        content: '';
        height: 75px;
        border-right: 1px solid #e8e8e8;
      }

      .icon-wrapper {
        height: 21px;
      }

      &:nth-child(3n) {
        border-right: none;

        &::after {
          height: 0;
          border-right: none;
        }
      }

      .order-btn-name {
        margin-top: 10px;
        line-height: 15px;
      }
    }
  }

  .operate-btn-group-wrapper {
    margin-top: 10px;

    .operate-btn-group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background-color: #fff;

      .operate-btn {
        flex: 0 0 25%;
        height: 45px;
        padding: 15px 0;
        border-bottom: 1px solid #e8e8e8;
        text-align: center;

        .icon-wrapper {
          height: 20px;

          .iconfont {
            line-height: 20px;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        &.unopen {
          color: #ccc;
        }

        .operate-name {
          margin-top: 5px;
          line-height: 15px;
        }
      }
    }
  }
}
</style>
