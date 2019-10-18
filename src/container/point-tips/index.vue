<template>
  <transition name="van-slide-up" @after-leave="handleAfterLeave">
    <div class="point-tips" v-if="visible">
      <p class="point-tips-text">{{ title }}: +{{ point }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'point-tips',
  props: {},
  data() {
    return {
      visible: false,
      title: '积分',
      point: 1,
      duration: 3000,
      timer: null,
      closed: false
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close() {
      this.closed = true
    },

    clearTimer() {
      clearTimeout(this.timer)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    }
  },
  mounted() {
    this.startTimer()
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.point-tips {
  position: absolute;
  top: 75%;
  right: 0;
  min-width: 100px;
  height: 30px;
  line-height: 30px;
  color: $primary-color;
  background-color: #ffedf5;
  border-radius: 30px 0 0 30px;
  border: 1px solid #ef559f;
  border-right: none;

  .point-tips-text {
    padding: 0 10px;
    text-align: right;
  }
}
</style>
