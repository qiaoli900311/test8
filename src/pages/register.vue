<template>
  <div class="register-page">
    <div class="logo">
      <img src="../assets/zhoudafu_logo.png" alt="周大福珠宝" />
    </div>
    <!-- 注册表单 -->
    <div class="form-section">
      <van-cell-group class="row">
        <van-field v-model="userName" placeholder="账号" class="has-border" />
      </van-cell-group>
      <van-cell-group class="row inline">
        <van-field
          v-model="passWord"
          placeholder="密码"
          type="password"
          class="has-border"
        />
      </van-cell-group>

      <van-button
        class="btn"
        :disabled="!enableSubmit"
        :loading="loading"
        @click="submit"
        >登录</van-button
      >
      <!--<p class="tip">未注册用户点击登录即注册</p>-->
    </div>
  </div>
</template>
<script>
import {Checkbox} from 'vant'
import {cellPhone} from '@levy9527/pattern-js'
import {login} from '@/const/api'
import {USER_TYPES} from '@/const/common'
import {mapState, mapMutations, mapActions} from 'vuex'
import cookie from 'js-cookie'
import {STORAGE_KEYS} from '@/const/common'

export default {
  name: 'register-page',
  layout: 'blank',
  components: {
    'van-checkbox': Checkbox
  },
  head() {
    return {
      title: '注册'
    }
  },
  data() {
    return {
      loading: false, // 注册请求中

      // 新用户注册
      userName: null,
      passWord: null,
    }
  },
  created() {
    this.$store.commit('logout')
  },
  computed: {
    ...mapState(['user']),
    enableSubmit() {
      return this.userName && this.passWord
    }
  },
  methods: {
    ...mapMutations(['updateUserType']),
    ...mapActions(['getUserInfo']),
    /**
     * 注册
     */
    async submit() {
      this.loading = true

      try {
        const {code, msg, payload} = await this.$axios.$post(
          login,
          {
            userName: this.userName,
            passWord: this.passWord
          },
          {
            params: {
              userName: this.userName,
              passWord: this.passWord
            }
          }
        )
        console.log('TCL: submit -> code, msg, payload', code, msg, payload)
        this.loading = false
        if (payload) {
          this.redirect({token: payload._id, userId: payload._id})
        } else {
          throw new Error(msg || '登录失败，请重试')
        }
      } catch (e) {
        this.loading = false
        this.$toast.fail(e.toString())
      }
    },
    /**
     * 注册成功后重定向到指定页面
     */
    redirect(payload) {
      this.$store.commit('login', payload)

      const {redirectUri} = this.$route.query

      const redirectUrl = decodeURIComponent(redirectUri || '')
      location.replace(redirectUrl)
    }
  }
}
</script>
<style lang="less">
@import '~assets/var';

@radius-size: 4px;

.logo {
  margin: 20px 0 35px 0;

  img {
    width: 80%;
  }
}

.register-page {
  background-color: #fff;
  height: 100%;
  padding: 30px 40px 0;
  box-sizing: border-box; // IE-BOX

  .form-section {
    border-radius: @radius-size;
    text-align: center;
    margin: 0 auto;

    .has-border {
      border: 1px solid #eee;
      border-radius: 6px;
    }

    // border修改
    .has-border::after,
    .van-cell-group::after {
      border: none;
    }

    .row {
      margin-bottom: 10px;

      &.inline {
        display: flex;

        .van-field {
          flex: 1;
        }
      }
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;

      .protocol {
        color: #6495fe;
      }
    }

    .btn {
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      color: #fff;
      background-color: @primary-color;
      border-color: @primary-color;
      border-radius: @radius-size;
    }
  }

  .tip {
    margin-top: 10px;
    color: #ccc;
  }
}
</style>
