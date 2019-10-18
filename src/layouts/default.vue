<template>
  <div class="wrapper">
    <header-nav-bar v-if="!hideNavBar"></header-nav-bar>
    <nuxt :keepAlive="keepAlive"></nuxt>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import HeaderNavBar from '@/components/header-nav-bar'
import keepAliveRoutes from '@/const/keepAliveRoutes'
import hideHeaderNavBar from '@/const/hideHeaderNavBar'

export default {
  components: {
    'header-nav-bar': HeaderNavBar
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    keepAlive() {
      return keepAliveRoutes.indexOf(this.routeName) > -1
    },
    hideNavBar() {
      return hideHeaderNavBar.indexOf(this.routeName) > -1
    }
  }
}
</script>

<style lang="stylus">
.wrapper {
  text-align: center;
  height: 100%;
}
</style>
