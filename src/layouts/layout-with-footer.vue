<template>
  <div class="layout-with-footer">
    <nuxt></nuxt>
    <div class="fixed-box">
      <van-tabbar fixed v-model="active" :active-color="primaryColor">
        <van-tabbar-item
          v-for="(item, i) in footerTab"
          :key="i"
          @click="$router.push(item.url)"
          :icon="item.icon"
        >
          {{ item.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import {Tabbar, TabbarItem} from 'vant'
export default {
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  },
  data() {
    return {
      primaryColor: '#1890ff',
      active: 0,
      footerTab: [
        {
          title: '首页',
          url: '/',
          icon: 'home-o'
        },
        {
          title: '购物车',
          url: '/cart',
          icon: 'shopping-cart-o'
        },
        {
          title: '我的',
          url: '/my',
          icon: 'user-o'
        }
      ]
    }
  },
  methods: {
    // 因为findIndex在华为手机上有兼容性问题所以没有使用
    handleTabActive() {
      this.footerTab.map((element, index) => {
        if (element.url == this.$route.path) {
          this.active = index
        }
        return element
      })
    }
  },
  watch: {
    $route(to, from) {
      this.handleTabActive()
    }
  },
  mounted() {
    this.handleTabActive()
    // 处理手动更改url hash是tab不跟随路由变动
    window.onhashchange = this.handleTabActive
  }
}
</script>
