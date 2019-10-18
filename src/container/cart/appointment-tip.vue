<template>
  <div class="appointment-tip">
    美丽的小主，您选购的部分商品需要提前3天进行预约，记得提前预约哦~
  </div>
</template>

<script>
export default {
  name: 'appointment-tip'
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.appointment-tip {
  font-weight: 400;
  padding: 8px 15px;
  background-color: rgba(230, 2, 111, 0.1);
  color: $primary-color;
}
</style>
