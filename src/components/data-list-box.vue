<template>
  <div class="data-list-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DataListBox'
}
</script>
<style lang="stylus">
.data-list-box {
  overflow-y: auto;
}
</style>
