<template>
  <div class="my-order font-l">
    <van-tabs
      v-model="tabActive"
      :lineWidth="tabWidth"
      :swipeThreshold="5"
      @change="handleTagChange"
      @disabled="onClickDisabled"
      swipeable
      animated
      sticky
      :offset-top="50"
    >
      <van-tab
        :title="value"
        v-for="(value, key, tabIndex) in tabList"
        :key="key"
        :disabled="tabIndex > 0"
      >
        <div class="data-list">
          <ul class="order-list-inner">
            <order-item
              v-for="(item, index) in list"
              :item="item"
              :key="index"
            ></order-item>
          </ul>
          <!--自定义no-results内容-->
          <no-results v-if="list.length <= 0"></no-results>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import DataList from '@femessage/data-list'
import orderItem from '@/container/order/order-list-item'
import noResults from '@/container/order/no-results'
import {orderList, commonList} from '@/const/api.js'
import {ORDER_LIST, ORDER_DETAIL} from '@/const/path.js'
import {mapState} from 'vuex'
import {TAB_LIST, STATUS_OBJ} from '@/const/order.js'

export default {
  components: {
    DataList,
    orderItem,
    noResults
  },
  data() {
    return {
      orderStatus: {
        status: this.$route.query.switchStatus || this.$route.query.status || ''
      },
      tabList: TAB_LIST,
      cloneTabActive: null,
      list: []
    }
  },
  computed: {
    ...mapState(['userId', 'user']),
    tabWidth() {
      return document.documentElement.clientWidth / 5
    },
    isOrderList() {
      return this.$route.path === ORDER_LIST
    },
    tabActive: {
      get: function() {
        if (!this.isOrderList) return this.cloneTabActive
        return +this.$route.query.index || 0
      },
      set: function(newValue) {
        if (!this.isOrderList) return

        this.cloneTabActive = newValue
        let user = this.$route.query.user
        this.$router.replace({
          path: ORDER_LIST,
          query: {
            status: STATUS_OBJ[newValue],
            index: newValue,
            user
          }
        })
      }
    }
  },
  created() {},
  mounted() {
    this.getData()
    let {index} = this.$route.query
    if (index >= 0) {
      this.handleTagChange(index)
    }
  },
  methods: {
    getData() {
      console.info(this.user)
      this.$axios
        .$get(
          `/poc/api/v1/common/list?collection=zhoudafu_wh_sales_order&acc_id=${
            this.user.id
          }`
        )
        .then(res => {
          let orders = res.payload.data || []
          this.setList(orders)
        })
    },
    setList(orders) {
      orders.forEach(item => {
        if (!item.activity) return
        item.products = []
        item.activity.forEach(i => {
          item.products.push(...i.goods)
        })
      })
      this.list = orders.reverse()
    },
    handleTagChange(index) {
      this.orderStatus.status = STATUS_OBJ[index]
    },
    onClickDisabled() {
      this.$toast('该功能未发布，敬请期待')
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.my-order {
  color: $gray;
  background: $bg-color;

  .order-list-inner {
    padding-top: 10px;
  }

  .data-list {
    position: relative;
    min-height: calc(100vh - 100px);

    &-without-tab {
      min-height: 'calc(100vh - %s)' % $tabs-height;
    }
  }
}
</style>
