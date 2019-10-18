<template>
  <div class="select-city-content">
    <div class="select-city form-list font-l" @click="showPopup">
      {{ !cityCode ? '请选择城市' : selected.activityCity }}
    </div>
    <div class="activity-time font-s" v-show="cityCode">
      活动开始时间：{{ selected.activityStartTime | formatActivityTime }}
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker
        :columns="citys"
        show-toolbar
        title="请选择城市"
        value-key="activityCity"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import {Picker, Actionsheet} from 'vant'
import {anniversaryCityList} from '@/const/api.js'
import dayjs from 'dayjs'
export default {
  props: {
    cityCode: {
      type: Number,
      defult: null
    }
  },
  components: {
    'van-picker': Picker,
    'van-actionsheet': Actionsheet
  },
  data() {
    return {
      show: false,
      selected: {},
      citys: []
    }
  },
  filters: {
    formatActivityTime(value, format = 'YYYY-MM-DD HH:mm') {
      let numberVal = Number(value)
      return dayjs(numberVal).isValid()
        ? dayjs(numberVal).format(format)
        : numberVal
    }
  },
  mounted() {
    this.getCitys()
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...'
    })
  },
  methods: {
    showPopup() {
      if (this.citys.length == 0) {
        this.$dialog
          .alert({
            title: '提示',
            message: '活动已结束，谢谢。'
          })
          .then(() => {
            // on close
            wx.closeWindow()
          })
        return
      }
      this.show = true
    },
    async getCitys() {
      try {
        const {payload} = await this.$axios.$get(anniversaryCityList)
        this.$toast.clear()
        this.citys = payload.content.filter(item => {
          return item.activityEndTime > dayjs().valueOf()
        })
      } catch (e) {}
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value, index) {
      this.selected = Object.assign({}, value)
      this.$emit('callback', {
        activityId: value.id,
        activityCode: value.activityCode
      })
      this.onCancel()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/var.styl';

.select-city-content {
  .select-city {
    position: relative;
    width: 100%;
    height: 44px;
    line-height: 42px;
    border: 1px solid $button-disable-color;
    border-radius: 4px;

    &::after {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      right: 9px;
      bottom: 20px;
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      border-top: 7px solid $gray;
    }
  }

  .activity-time {
    color: $gray;
    margin: 15px 0;
    text-align: left;
  }
}
</style>
