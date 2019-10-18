<template>
  <div class="index">
    <div class="">
      <form action="/">
        <van-search
          v-model="searchValue"
          placeholder="搜索你喜欢的商品"
          show-action
          @search="onSearch"
        >
          <van-icon slot="left-icon" name="search" />
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </form>
    </div>
    <van-swipe :autoplay="3000" :indicatorColor="indicatorColor">
      <van-swipe-item v-for="(banner, index) in banners" :key="index">
        <img :src="banner.url" class="banner" />
      </van-swipe-item>
    </van-swipe>

    <van-row class="hot-products" v-if="hotProducts && hotProducts.length">
      <div class="hot-products-name-wrapper">
        <icon-font icon="iconhot" class="icon"></icon-font>
        <div class="hot-products-name">热销商品</div>
      </div>
      <van-row>
        <van-col
          span="12"
          v-for="(product, prodIndex) in showProducts"
          :key="prodIndex"
        >
          <div class="product" @click="toDetail(product)">
            <div class="product-img-wrapper">
              <img v-lazy="product.imagesUrl" class="product-img" />
            </div>
            <p class="name">{{ product.name }}</p>
            <p class="price">{{ product.showPrice | price }}</p>
            <div class="product-desc">
              <p class="sold-num">{{ product.sales | soldNumFilter }}付款</p>
              <icon-font
                icon="iconziyuan"
                class="icon-cart"
                v-if="false"
              ></icon-font>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-row>
    <!-- <div class="no-product">- {{ productTips }} -</div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import {Swipe, SwipeItem} from 'vant'
import IconFont from '@/components/icon-font'
import {getGoods, commonList} from '@/const/api.js'
import {GOODS_DETAIL, HOST_LIST} from '@/const/path.js'
import {mapGetters, mapState, mapActions} from 'vuex'
import {Lazyload, Search} from 'vant'
Vue.use(Lazyload)
Vue.use(Search)

export default {
  layout: 'layout-with-footer',
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    IconFont
  },
  head() {
    return {
      title: '周大福商城'
    }
  },
  data() {
    return {
      banners: [
        {url: require('~/assets/banner1.png')},
        {url: require('~/assets/banner2.png')}
      ],
      indicatorColor: '#fff',
      hotProducts: [],
      showProducts: [],
      tabLineWidth: 85,
      tabLineHeight: 3,
      swipeThreshold: 3,
      searchValue: sessionStorage.getItem('searchKey')
    }
  },

  filters: {
    soldNumFilter(soldNum) {
      soldNum = parseInt(soldNum)
      return soldNum >= 10000 ? (soldNum / 10000).toFixed(1) + '万' : soldNum
    }
  },
  mounted() {
   this.hotProducts =[{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249785,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=10031","brandName":"DHC蝶翠诗","code":"DHC","salePrice":"21.80","price":"218.00","name":"DHC蝶翠诗橄榄卸妆油","id":"3013","stock":45,"categoryName":"卸妆","sales":"218.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249786,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=5572","brandName":"ICE.GG","code":"ICE.GG","salePrice":"21.00","price":"210.00","name":"ICE.GG水澈美肌水感亲肤卸妆油","id":"3945","stock":107,"categoryName":"卸妆","sales":"210.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249787,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=13989","brandName":"菲洛嘉","code":"FILORGA","salePrice":"20.90","price":"209.00","name":"菲洛嘉赋活洁肤卸妆精华液","id":"3313","stock":110,"categoryName":"卸妆","sales":"209.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249788,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=13497","brandName":"ICE.GG","code":"ICE.GG","salePrice":0,"price":"160.00","name":"ICE.GG水澈美肌水感净柔洁面乳","id":"3946","stock":110,"categoryName":"面部清洁","sales":"160.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249789,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=10034","brandName":"JUVENA 柔俪兰","code":"JUVENA","salePrice":120,"price":"300.00","name":"瑞士JUVENA柔俪兰净肌洁面泡沫","id":"2338","stock":106,"categoryName":"面部清洁","sales":"300.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249790,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=7765","brandName":"美帕","code":"MedSPA","salePrice":"144.00","price":"360.00","name":"美帕瑞士蓝球洁面晶露","id":"5393","stock":110,"categoryName":"面部清洁","sales":"360.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249791,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=20004","brandName":"芙丽芳丝","code":"freeplus","salePrice":0,"price":"150.00","name":"freeplus芙丽芳丝净润洗面霜","id":"2927","stock":110,"categoryName":"面部清洁","sales":"150.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249792,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=7301","brandName":"各品牌护肤旅行装","code":"LANCOME","salePrice":0,"price":"78.00","name":"兰蔻新清滢柔肤水粉水","id":"3497","stock":110,"categoryName":"化妆水","sales":"78.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249793,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=9965","brandName":"LA VILLOSA（护肤）","code":"Lavillosa","salePrice":0,"price":"450.00","name":"雪露紫活悦光采嫩肤水Lavillosa","id":"7169","stock":110,"categoryName":"化妆水","sales":"450.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249794,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=20446","brandName":"娥佩兰　","salePrice":0,"price":"58.00","name":"娥佩兰薏仁化妆水","id":"3926","stock":110,"categoryName":"化妆水","sales":"58.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249795,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=20561","brandName":"美帕","salePrice":0,"price":"200.00","name":"美帕焕颜凝润柔肤水","id":"7218","stock":110,"categoryName":"化妆水","sales":"200.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249796,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=19550","brandName":"JUVENA 柔俪兰","code":"JUVENA","salePrice":0,"price":"1280.00","name":"柔俪兰水盈亮肌活润肌底液","id":"3290","stock":110,"categoryName":"化妆水","sales":"1280.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249797,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=20179","brandName":"茵芙莎","code":"IPSA","salePrice":0,"price":"350.00","name":"IPSA茵芙莎流金岁月凝润美肤水流金水","id":"5201","stock":110,"categoryName":"化妆水","sales":"350.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249798,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=8120","brandName":"LA VILLOSA（护肤）","code":"Lavillosa","salePrice":0,"price":"420.00","name":"Lavillosa雪露紫启焕精华液小金瓶","id":"6804","stock":110,"categoryName":"面部精华","sales":"420.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249799,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=17223","brandName":"雅顿","price":"760.00","name":"伊丽莎白雅顿时空焕活夜间多效胶囊精华液60粒小粉胶","id":"7647","stock":110,"categoryName":"面部精华","sales":"760.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249800,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=19555","brandName":"LA VILLOSA（护肤）","code":"LaVillosa","salePrice":0,"price":"1100.00","name":"瑞士雪露紫LaVillosa毛孔细致保湿精华液粉安瓶","id":"4227","stock":110,"categoryName":"面部精华","sales":"1100.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249801,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=9760","brandName":"怡思丁","code":"ISDIN","salePrice":0,"price":"189.00","name":"ISDIN怡思丁秀提焕颜蛋白聚糖透亮焕活安瓶","id":"7115","stock":110,"categoryName":"面部精华","sales":"189.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249802,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=19335","brandName":"LA VILLOSA（护肤）","code":"LaVillosa","salePrice":0,"price":"1580.00","name":"瑞士雪露紫LaVillosa紧颜修护精华液黄安瓶","id":"2512","stock":110,"categoryName":"面部精华","sales":"1580.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249803,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=8868","brandName":"LA VILLOSA（护肤）","code":"LaVillosa","salePrice":0,"price":"360.00","name":"雪露紫祛斑精华液","id":"5014","stock":110,"categoryName":"面部精华","sales":"360.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249804,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=7456","brandName":"兰蔻LANCOME","code":"LANCOME","salePrice":0,"price":"1080.00","name":"兰蔻新精华肌底液50ml","id":"2707","stock":110,"categoryName":"面部精华","sales":"1080.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249805,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=6980","brandName":"各品牌护肤旅行装","code":"LANCOME","price":"98.00","name":"Lancome兰蔻眼部精华肌底液小黑瓶","id":"4400","stock":110,"categoryName":"面部精华","sales":"98.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249806,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=19549","brandName":"雅顿","price":"690.00","name":"伊丽莎白雅顿时空焕活胶囊精华液60粒","id":"7104","stock":110,"categoryName":"面部精华","sales":"690.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249807,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=19997","brandName":"赛贝格","code":"DrSebagh","salePrice":0,"price":"1100.00","name":"DrSebagh赛贝格臻白淡斑粉vc粉","id":"2373","stock":110,"categoryName":"面部精华","sales":"1100.00"},{"_id":{"timestamp":1562753194,"machineIdentifier":3100372,"processIdentifier":23117,"counter":1249808,"date":1562753194000,"time":1562753194000,"timeSecond":1562753194},"imagesUrl":"https://wx.fionacos.com/index.php?s=/Tools-Images-thumb&sk=11397","brandName":"JUVENA 柔俪兰","salePrice":0,"price":"780.00","name":"JUVENA柔俪兰水感焕肌精华液","id":"6940","stock":110,"categoryName":"面部精华","sales":"780.00"},]
        this.hotProducts.forEach(item => {
          item.memPrice = (item.price * this.sale).toFixed(2)
          item.showPrice = item.salePrice
            ? Math.min(
                Number(item.price),
                Number(item.memPrice),
                Number(item.salePrice)
              )
            : item.memPrice
        })
        this.onSearch()
      this.getCartNum(this.userId)
  },
  computed: {
    ...mapGetters('city', ['areaCode']),
    ...mapState(['sale', 'userId']),
    productTips() {
      return this.hotProducts && this.hotProducts.length
        ? '没有更多了'
        : '更多商品上架中，敬请期待'
    }
  },
  watch: {
    searchValue() {
      sessionStorage.setItem('searchKey', this.searchValue)
    }
  },
  methods: {
    ...mapActions('cart', ['getCartNum']),
    onSearch() {
      this.showProducts = []
      if (!this.searchValue) {
        this.showProducts = [...this.hotProducts]
      } else {
        this.hotProducts.forEach(pro => {
          if (new RegExp(this.searchValue).test(pro.name))
            this.showProducts.push(pro)
        })
      }
    },
    getHotProducts() {
      return this.$axios.get(commonList('commodity'))
    },
    toDetail(item) {
      let {_id, code} = item
      this.$router.push({
        path: GOODS_DETAIL,
        query: {
          id: _id,
          code
        }
      })
    },
    toHotlist() {
      this.$router.push({
        path: HOST_LIST
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/var.styl';

.index {
  color: $text-gray;

  .search-wrapper {
    display: flex;
    height: 30px;
    padding: 10px 15px;
    line-height: 30px;
    background-color: $white;

    .search-bar {
      display: block;
      flex: 1;

      .bar {
        height: 30px;
        padding-left: 10px;
        border-radius: 20px;
        line-height: 30px;
        color: $gray;
        background-color: $bg-color;

        .van-icon-search {
          line-height: 30px;
          font-size: 16px;
          font-weight: bold;
          color: $primary-color;
        }

        .bar-text {
          vertical-align: top;
        }
      }
    }
  }

  .van-swipe {
    height: 187px;

    .van-swipe__indicator {
      width: 9px;
      height: 9px;
      background-color: #9b9b9b;
    }

    .banner {
      max-height: 100%;
      width: 100%;
    }
  }

  .msg-wrapper {
    display: flex;
    margin-bottom: 10px;
    padding: 0 15px;
    line-height: 30px;
    background-color: $white;

    .icon-msg {
      padding-right: 5px;
      vertical-align: middle;
      font-size: 10px;
      color: $primary-color;
    }

    .msg {
      flex: 1;
      font-size: 12px;
      vertical-align: middle;
    }

    .van-icon-arrow {
      line-height: 30px;
      color: $text-gray;
    }
  }

  .invite-poster-wrapper {
    display: flex;
    padding-bottom: 45%;
    margin-top: 10px;
    position: relative;
    background-color: #fff;

    .invite-poster {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .to-invite {
      position: absolute;
      width: 50%;
      height: 100%;

      &.right {
        right: 0;
      }
    }
  }

  .van-tabs {
    margin-top: 10px;
    background-color: $white;

    .van-tabs__wrap {
      z-index: 1;

      .van-tab {
        font-size: 15px;
        color: $gray;

        &.van-tab--active {
          color: $primary-color;
        }
      }
    }
  }

  .hot-products {
    margin-top: 10px;
    background-color: $white;

    .hot-products-name-wrapper {
      display: flex;
      height: 20px;
      padding: 15px 15px 5px;
      font-size: 15px;

      .icon {
        line-height: 20px;
        color: $primary-color;
      }

      .hot-products-name {
        flex: 1;
        margin-left: 5px;
        vertical-align: middle;
        color: $gray;
      }

      .check-more {
        line-height: 20px;

        .check-more-inner {
          vertical-align: middle;
        }

        .van-icon-arrow {
          vertical-align: middle;
          font-size: 15px;
        }
      }
    }
  }

  .van-row {
    padding: 5px;

    .product {
      margin: 5px;
      padding-bottom: 10px;
      font-size: 14px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);

      .product-img-wrapper {
        padding-bottom: 100%;
        position: relative;

        .product-img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .name {
        display: -webkit-box;
        height: 37px;
        margin: 5px 10px;
        font-size: 13px;
        color: $gray;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        margin-left: 5px;
        margin-right: 5px;
        font-size: 15px;
        color: $primary-color;
      }

      .product-desc {
        display: flex;
        padding: 0 5px;

        .sold-num {
          flex: 1;
          font-size: 13px;
        }

        .icon-cart {
          margin-left: 5px;
          font-size: 15px;
          line-height: 22px;
        }
      }
    }
  }

  .no-product {
    padding-top: 10px;
    font-size: 14px;
    text-align: center;
    color: rgb(102, 102, 102);
  }
}
</style>
