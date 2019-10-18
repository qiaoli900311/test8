<template>
  <div class="cookie">
    <van-button type="primary" @click="handleClick">清除cookies</van-button>
    <van-button type="primary" @click="$router.push('/')">返回首页</van-button>
    <p v-for="(value, key) in cookies" :key="key">{{ key }}: {{ value }}</p>
  </div>
</template>

<script>
import cookie from 'js-cookie'

export default {
  data() {
    return {
      cookies: cookie.get()
    }
  },
  methods: {
    handleClick(e) {
      const domain = location.host
      for (let key in this.cookies) {
        cookie.remove(key, {path: '/', domain: `.${domain}`})
      }
      this.cookies = cookie.get()
    }
  }
}
</script>

<style lang="stylus">
.cookie {
  width: 96%;
  margin: 0 auto;
  text-align: center;

  p {
    text-align: justify;
  }
}
</style>
