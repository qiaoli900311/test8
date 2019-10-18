<template>
  <div>
    <p v-if="desc || title" style="text-align: left;">{{ desc || title }}</p>
  </div>
</template>
<script>
export default {
  name: 'plain',
  layout: 'blank',
  head() {
    if (this.title) return {title: this.title}
    return {}
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    desc() {
      return this.$route.query.desc
    }
  }
}
</script>
