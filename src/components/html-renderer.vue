<template>
  <div v-html="content" ref="content"></div>
</template>

<script>
export default {
  name: 'html-renderer',
  props: {
    content: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      const $el = this.$refs.content
      this.$emit('onrenderer', $el)
    })
  }
}
</script>
