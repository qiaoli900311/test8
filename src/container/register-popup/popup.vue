<template>
  <div class="register-popup" v-show="visible" @click.self="close()">
    <!-- 注册表单 -->
    <div class="form-section">
      <van-cell-group class="row">
        <van-field v-model="phone" placeholder="绑定手机" class="has-border" />
      </van-cell-group>
      <van-cell-group class="row inline">
        <van-field v-model="smsCode" placeholder="验证码" class="has-border" />
        <van-button
          class="has-border"
          type="default"
          :disabled="!phoneValid || sending === true"
          style="width:102px;"
          @click="sendMsg"
        >
          <!-- <count-down
            v-if="sending"
            @finish="timerEnd"
            :seconds="59"
          /> -->
          <span>获取验证码</span>
        </van-button>
      </van-cell-group>
      <div class="checkbox-wrap row">
        <van-checkbox
          checked-color="#E5006E"
          v-model="agreement.agreed"
          class="checkbox"
          >已经阅读并同意
        </van-checkbox>
        <span class="protocol" @click="() => (agreement.show = true)">
          《秀域服务协议》</span
        >
      </div>
      <van-button
        class="btn"
        :disabled="!enableSubmit"
        :loading="loading"
        @click="submit"
        >立即注册</van-button
      >
    </div>

    <!-- 协议弹窗 -->
    <agreement
      v-if="agreement.show"
      :show.sync="agreement.show"
      :back="false"
      container="body"
    ></agreement>
  </div>
</template>
<script>
import agreement from '@/components/agreement.vue'
// import CountDown from '@femessage/count-down'
import {Checkbox} from 'vant'
import {cellPhone} from '@levy9527/pattern-js'
import {sendMsg, userRegister} from '@/const/api'
import {USER_TYPES, STORAGE_KEYS} from '@/const/common'
import cookie from 'js-cookie'

/**
 * $root or nuxt context instance
 */
let $vm = null

export default {
  name: 'register-popup',
  components: {
    agreement,
    'van-checkbox': Checkbox
    // CountDown
  },
  data() {
    return {
      visible: false,

      sending: false, // 发送验证中
      loading: false, // 注册请求中

      // 新用户注册
      phone: null,
      smsCode: null,
      phoneValid: null,

      // 注册协议
      agreement: {
        agreed: false,
        show: false
      },
    }
  },
  computed: {
    enableSubmit() {
      return this.phoneValid && this.smsCode && this.agreement.agreed
    }
  },
  watch: {
    phone(val) {
      this.phoneValid = cellPhone.test(val)
    },
    visible(val) {
      let func = this.keyboardHandler
      val
        ? document.body.addEventListener('focusout', func)
        : document.body.removeEventListener('focusout', func)
    }
  },
  methods: {
    /**
     * 设置当前实例
     *
     * @param {Vue} vm $root
     * @throws {Error} invalid
     */
    _setInstance(vm) {
      if (vm && (vm.$store || vm.store) && vm.$axios && vm.$toast) {
        $vm = vm
      } else {
        throw new Error('$vm invalid')
      }
    },
    /**
     * 关闭
     * @param {Boolean} force 强制关闭，即使正在请求
     */
    close(force) {
      if (this.loading && !force) return
      this.visible = false
      this.agreement.show = false
      // $root emit event
      if ($vm && $vm.$emit) $vm.$emit('close')
    },
    keyboardHandler() {
      window.scrollTo(0, window.scrollY)
    },
    timerEnd() {
      this.sending = false
    },
    /**
     * 发送验证码
     */
    async sendMsg() {
      if (this.sending) return

      this.sending = true
      try {
        const $store = $vm.$store || $vm.store

        await $vm.$axios.$post(sendMsg, {
          phone: this.phone,
          name: $store.state.user.nickName
        })
      } catch (e) {
        $vm.$toast.fail('验证码发送失败')
        this.timerEnd()
      }
    },
    /**
     * 注册
     */
    async submit() {
      this.loading = true
      try {
        const $store = $vm.$store || $vm.store

        const {code, msg, payload} = await $vm.$axios.$post(
          userRegister,
          {
            phone: this.phone,
            smsCode: this.smsCode
          },
          {
            headers: {Authorization: 'Bearer ' + cookie.get(STORAGE_KEYS.TOKEN)} // Fixed: 处理Token为空
          }
        )
        if (code === '0' && payload) {
          // 更新用户信息，失败后设置会员类型
          if (!(await $store.dispatch('getUserInfo', true))) {
            $store.commit('updateUserType', USER_TYPES.MEMBER)
          }
          this.close(true)
        } else {
          throw new Error(msg || '注册失败，请重试')
        }
      } catch (e) {
        $vm.$toast.fail(e.message)
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less">
@primary-color: rgba(255, 102, 0, 1);
@radius-size: 8px;
@tabs-height: 50px;

.register-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  overflow: hidden;

  &,
  .agreement {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .form-section {
    width: 250px;
    padding: 20px;
    background: #fff;
    border-radius: @radius-size;
    text-align: center;

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
          margin-right: 10px;
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
      width: 80%;
      height: 35px;
      line-height: 35px;
      margin-top: 10px;
      color: #fff;
      background-color: @primary-color;
      border-color: @primary-color;
      border-radius: @radius-size;
    }
  }
}
</style>
