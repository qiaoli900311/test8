<template>
  <div>
    <van-popup
      class="agreement"
      v-model="visible"
      position="bottom"
      :get-container="container"
    >
      <van-nav-bar
        class="nav"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
      <div class="wrapper1">
        <div class="wb_content">
          <p style="text-align:center; line-height:150%;">
            <strong>
              <span style="line-height: 150%; font-size: 16px;">&nbsp;</span>
            </strong>
          </p>
          <p style="text-align:center; line-height:150%;">
            <strong>
              <span style="line-height: 150%; font-size: 16px;">
                <span style="">{{ title }}</span>
              </span></strong
            >
          </p>
          <p style="text-align:center; line-height:150%;">
            <strong>
              <span style="line-height: 150%; font-size: 16px;">&nbsp;</span>
            </strong>
          </p>
          <p style="line-height:150%;">
            <span style="line-height:150%; font-size:16px;"
              ><span style="">欢迎你使用周大福商城服务！</span></span
            >
          </p>
          <p style="line-height:150%;">
            <span style="line-height:150%; font-size:16px;">&nbsp;</span>
          </p>
          <p style="line-height:150%;">
            <strong
              ><span style="line-height: 150%; font-size: 16px;"
                >以下为具体服务协议内容</span
              ></strong
            >
          </p>
          <p style="line-height:150%;">
            <strong
              ><span style="line-height: 150%; font-size: 16px;"
                >&nbsp;</span
              ></strong
            >
          </p>
          <p style="line-height:150%;">
            <span style="line-height:150%; font-size:16px;"
              ><span style="">XXXXXXX</span></span
            >
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {NavBar} from 'vant'
export default {
  name: 'agreement',
  components: {
    'van-nav-bar': NavBar
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '周大福服务协议'
    },
    // 是否调用hisotry.back
    back: {
      type: Boolean,
      default: true
    },
    // 挂载点
    container: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  watch: {
    show(val) {
      this.visible = val
    }
  },
  methods: {
    onClickLeft() {
      if (this.back) {
        history.back(-1)
      } else {
        this.visible = false
        // :show.sync
        this.$emit('update:show', this.visible)
      }
    }
  }
}
</script>
<style lang="less">
@import '~assets/var';

@nav-height: 46px;

.agreement {
  text-align: left;
  height: 100%;

  .nav {
    height: @nav-height;
    background-color: @primary-color;

    .van-icon {
      color: @white;
    }

    .van-nav-bar__text {
      color: @white;

      &:active {
        background: transparent;
      }
    }

    &::after {
      border: none;
    }
  }

  .wrapper1 {
    padding: 0 20px;
    margin-top: @nav-height;
    height: calc(~'100% - @{nav-height}');
    text-align: justify;
    overflow: auto;
    box-sizing: border-box;
  }

  .wbtag {
    width: 100%;
    border-top: 1px #000 solid;
    margin-top: 25px;
    padding-top: 10px;
    padding-right: 15px;
  }
}
</style>
