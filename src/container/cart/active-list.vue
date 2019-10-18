<template>
  <div class="active-list">
    <van-cell-group class="cell-activity mb10">
      <van-cell
        center
        v-for="(item, index) in product.strategies"
        :key="index"
        class="strategy-cell"
        :clickable="true"
        @click="setActive(item)"
      >
        <div class="activity-label">{{ getStrategieTypeName(item.type) }}</div>
        <div class="content font-l">
          {{ item.title }}
        </div>
        <!--<div class="tools red">789</div>-->
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
const TRATEGIE_TYPE_NAME = {
  '-1': '会员价',
  0: '买高送低',
  1: '满额减额',
  2: '买件送件',
  3: '满额打折',
  4: '单品打折'
}

export default {
  name: 'active-list',
  props: {
    product: {
      type: Object,
      default: {}
    }
  },
  methods: {
    getStrategieTypeName(type) {
      return TRATEGIE_TYPE_NAME[type]
    },
    setActive(item) {
      this.$emit('selectedActive', item)
    }
  }
}
</script>

<style lang="less">
@import '~assets/var.less';

.active-list {
  .cell-activity {
    padding: 5px 0;

    .van-cell__value {
      display: flex;
    }
  }

  .activity-label {
    color: @primary-color;
    border: 1px solid @primary-color;
    border-radius: 2px;
    padding: 0 5px;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
  }

  .content {
    color: @text-gray;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }
}
</style>
