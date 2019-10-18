<template>
  <div class="confirm-item">
    <div class="title-box font-m" @click="linkHandle">
      <div class="title">
        {{ title }}
      </div>
      <van-icon name="arrow" v-if="hasLink" />
    </div>
    <div class="slot-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    /*
    跳转路径
    '/index'

    {
      path:'/index',
      query:{
        id:1
      }
    }
    */
    to: {
      type: [String, Object]
    },
    hasLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    linkHandle() {
      if (!this.to) return

      let {path = this.to, query = {}} = this.to

      this.$router.push({
        path,
        query
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.confirm-item {
  padding: 0 0 10px 15px;
  background: #fff;
  margin: 10px 0;

  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding: 0 16px 0 8px;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    position: relative;
    color: $gray;

    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 15px;
      top: 50%;
      left: 0;
      background: $primary-color;
      transform: translateY(-50%);
    }
  }

  .slot-box {
    padding-top: 10px;
    text-align: left;
  }
}
</style>
