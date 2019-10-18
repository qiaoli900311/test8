/**
 * 购物车模块
 */

import {getCartGoods} from '@/const/api'

export const state = () => ({
  // 购物车商品数量
  cartNum: null,
  cartGoods: []
})

export const mutations = {
  setCartNum(state, payload) {
    state.cartNum = payload
  },
  setCartGoods(state, payload) {
    state.cartGoods = payload
  }
}

export const actions = {
  async getCartNum({commit}, payload) {
    try {
      const res = await this.$axios.$get(getCartGoods, {
        params: {userId: payload}
      })

      commit('setCartNum', res.payload ? res.payload.total : null)
      commit('setCartGoods', res.payload.data || [])
      return true
    } catch (e) {
      return false
    }
  }
}
