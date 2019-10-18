<template>
  <div class="city-select">
    <van-popup
      v-model="visible"
      position="bottom"
      :close-on-click-overlay="false"
    >
      <van-area
        :area-list="areaList"
        @confirm="areaConfirm"
        @cancel="areaCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from '@/const/arealist.js'

import {Area} from 'vant'

import {mapMutations} from 'vuex'

export default {
  components: {
    'van-area': Area
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      areaList: AreaList
    }
  },
  methods: {
    ...mapMutations('city', ['cityUpdate']),
    areaConfirm(data) {
      this.cityUpdate(data)
      this.$emit('areaConfirm', data)
      this.areaCancel()
    },
    areaCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="stylus"></style>
