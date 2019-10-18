<template>
  <div class="no-results">
    <img
      class="shopCart"
      src="https://bucket-showyu.oss-cn-beijing.aliyuncs.com/mobile/shopCart.png"
      alt="暂无图片"
    />
    <div class="hint-txt font-s">- 暂无内容 -</div>
  </div>
</template>

<script>
export default {
  name: 'noResults'
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.no-results {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  margin: auto;
  width: 100vw;
  height: 280px;

  .shopCart {
    margin-top: 27px;
    width: 103px;
    height: 101px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .hint-txt {
    color: #999;
    margin-bottom: 20px;
  }
}
</style>
