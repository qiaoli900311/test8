<template>
  <div class="address-list">
    <van-radio-group
      v-if="$slots.default"
      v-model="inValue"
      @onchange="handleChange"
    >
      <slot></slot>
    </van-radio-group>
    <div class="address-list__noData" v-else>暂无数据</div>
    <van-button class="address-list__new" type="primary" @click="onNew"
      >新建地址</van-button
    >
  </div>
</template>

<script>
export default {
  name: 'address-list',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inValue: ''
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.inValue = newVal
      }
    }
  },
  methods: {
    onNew(e) {
      this.$emit('onNew', e)
    },
    handleChange(e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="stylus">
@import './list.styl';
</style>
