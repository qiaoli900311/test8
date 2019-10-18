<template>
  <div class="header-nav-bar">
    <van-nav-bar left-text="返回" left-arrow @click-left="goBack" fixed />
  </div>
</template>

<script>
import {NavBar} from 'vant'
import {INDEX} from '@/const/path.js'
export default {
  name: 'header-nav-bar',
  components: {
    'van-nav-bar': NavBar
  },
  methods: {
    goBack() {
      history.length > 1 ? this.$router.back() : this.$router.push(INDEX)
    }
  }
}
</script>

<style lang="less">
@import '~assets/var';

.header-nav-bar {
  position: relative;
  z-index: 100;
  height: @nav-height;

  .van-nav-bar {
    height: @nav-height;
    line-height: @nav-height;
    background-color: #f60;

    .van-icon {
      color: @white;
    }

    &::after {
      border: none;
    }
  }

  .van-nav-bar__text {
    color: @white;

    &:active {
      background: transparent;
    }
  }

  .van-nav-bar--fixed {
    position: fixed;
  }
}
</style>
