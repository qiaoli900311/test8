<template>
  <a href="javascript:;" class="topic-button" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="stylus">
.topic-button {
  display: inline-block;
  min-width: 110px;
  height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid #e5006f;
  color: #e5006f;
  background-color: #fff;
  border-radius: 30px;
  line-height: 28px;
  margin: 10px 5px;
}
</style>
