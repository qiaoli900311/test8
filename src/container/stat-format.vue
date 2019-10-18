<template>
  <div class="stat-format" @click="handleClick">
    <slot name="default"></slot>
    <span class="stat-format__info">
      {{ info | statNumber }}
    </span>
    <slot name="back"></slot>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Number
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  },
  filters: {
    statNumber(value) {
      if (typeof value !== 'number') return
      const boundary = [1, 1000, 10000]
      const prefix = ['', '', 'w+']
      for (let i = 0; i < boundary.length; i++) {
        const next = boundary[i + 1] || Number.POSITIVE_INFINITY
        const cur = boundary[i]
        if (value >= cur && value < next && prefix[i]) {
          return parseInt(value / cur) + prefix[i]
        }
      }
      return value
    }
  }
}
</script>

<style lang="stylus">
.stat-format {
  display: inline-flex;
  height: 100%;
  width: 50px;
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  padding: 0 4px;

  .stat-format__info {
    text-align: center;
    flex: 1;
  }
}
</style>
