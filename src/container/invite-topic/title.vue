<template>
  <div class="topic-title">— <slot></slot> —</div>
</template>

<script>
export default {
  name: 'topic-title'
}
</script>

<style lang="stylus">
.topic-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #333;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
}
</style>
