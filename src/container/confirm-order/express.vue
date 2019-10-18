<template>
  <van-popup
    v-model="showExpress"
    :close-on-click-overlay="false"
    @click-overlay="closePopup"
    class="express-popup"
  >
    <div class="express">
      <div class="close-icon">
        <div @click="closePopup">
          <icon-font icon="iconshibai"></icon-font>
        </div>
      </div>

      <div
        class="font-m mb10"
        v-for="(item, index) in expressDataList"
        :key="index"
      >
        <div class="gray">{{ item.label }}</div>
        <div class="text-gray">{{ item.content }}</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import IconFont from '@/components/icon-font'

export default {
  components: {
    IconFont
  },
  props: {
    showExpress: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expressDataList: [
        {
          label: '配送范围:',
          content: '全国配送（偏远地区除外）'
        },
        {
          label: '配送运费:',
          content: '按照实际地址和货物情况而定，下单时自动给出具体配送费用'
        },
        {
          label: '配送时间:',
          content: '当天16点之前的订单当天发货，16点以后的订单次日发货​'
        }
      ]
    }
  },
  methods: {
    closePopup() {
      this.$emit('update:showExpress', false)
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl'

  .express-popup {
  border-radius: 8px;

  .express {
    text-align: left;
    width: 260px;
    padding: 10px 15px;

    .close-icon {
      color: #ccc;
      display: flex;
      justify-content: flex-end;

      i {
        padding: 0 0 8px 8px;
      }
    }
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .gray {
    color: $gray;
  }

  .text-gray {
    color: $text-gray;
  }
}
</style>
