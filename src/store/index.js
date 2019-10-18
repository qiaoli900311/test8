import cookie from 'js-cookie'
import {findByID} from '@/const/api'
import {USER_TYPES, STORAGE_KEYS, LIVE} from '@/const/common'
import {commonLog} from '@/const/log'

// 最好提前在你的 store 中初始化好所有所需属性
// https://vuex.vuejs.org/zh-cn/mutations.html
export const state = () => ({
  // 这两个用于client side的使用, 又放cookie里是为了刷新时状态不丢失
  userId: cookie.get(STORAGE_KEYS.USER_ID) || '',
  token: cookie.get(STORAGE_KEYS.TOKEN) || '',
  tenantId: 'afiona',
  meta: {},
  user: {},
  sale: 1, // 会员折扣，默认为1不打折
  couponList: [], // 优惠券列表
  menuList: [],
  permission: {}
})

export const getters = {
  // 是否登录
  isLogin(state) {
    return !!state.token
  },
  // 注册会员
  isMember(state) {
    return state.user.type === USER_TYPES.MEMBER
  },
  isVisitor(state) {
    return state.user.type === USER_TYPES.VISITOR
  },
  // 是否已更新用户信息
  hasProfile(state) {
    return Boolean(state.user && state.user.id)
  }
}

//  mutation 必须同步执行
export const mutations = {
  login(state, payload) {
    console.log('TCL: login -> payload', payload)
    state.token = payload.token
    state.userId = payload.userId

    // 部署不一定是在根路径, 所以cookie要设置path
    let path = this.$router.options.base
    cookie.set(STORAGE_KEYS.TOKEN, payload.token, {path})
    cookie.set(STORAGE_KEYS.USER_ID, payload.userId, {path})
  },
  logout(state) {
    state.sale = 1
    state.token = ''
    state.userId = ''
    state.couponList = []
    sessionStorage.removeItem('searchKey')

    let path = this.$router.options.base
    cookie.remove(STORAGE_KEYS.TOKEN, {path})
    cookie.remove(STORAGE_KEYS.USER_ID, {path})
  },
  updateUserType(state, payload) {
    state.user.type = payload
  },
  update(state, payload) {
    state.user = payload.user
    state.couponList = payload.user.couPonList
    LIVE.forEach(item => {
      if (item.level == state.user.level) {
        state.sale = item.sale
      }
    })
  }
}

// Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
export const actions = {
  /**
   * 开发环境获取token
   */
  async getDevToken({commit}, payload) {
    try {
      let resp = await this.$axios.post(
        '/showyu-auth-center/api/v1/accounts/login',
        {
          username: 'admin',
          password: 'abcd1234'
        }
      )

      const {id, token, tenantId} = resp.data.payload

      commit('login', {
        id,
        tenantId,
        token: token
      })
      return resp.data
    } catch (e) {
      console.error('Fail:getDevToken', e.message)
    }
  },

  /**
   * 用户信息
   *
   * @param {Boolean} force 强制更新
   * @param {Boolean} success
   */
  async getUserInfo({state, commit, getters}, force) {
    try {
      // 默认不重新拉取用户信息
      if (getters.hasProfile && !force) return true

      const {payload} = await this.$axios.$get(findByID, {
        params: {id: state.userId}
      })
      if (!payload) this.$router.push('/register')

      console.log(payload)

      commonLog(
        {
          memberId: state.userId,
          module: 3,
          actionCode: 0,
          activityId: '',
          targetId: ''
        },
        this
      )
      commit('update', {user: payload})
      return true
    } catch (e) {
      return false
    }
  }
}
