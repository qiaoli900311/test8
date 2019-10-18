import Vue from 'vue'
import {userAddressList} from '@/const/api.js'
import {RECEIVE_ADDRESS_DEFAULT_TYPE} from '@/const/common.js'
const {DEFAULT} = RECEIVE_ADDRESS_DEFAULT_TYPE

const addFullAddress = function(addressList) {
  return addressList.map(el => {
    const {
      proviceName = '',
      cityName = '',
      countryName = '',
      streetName = '',
      address = ''
    } = el
    el.fullAddress = `${proviceName}${cityName}${countryName}${streetName ||
      ''}${address}`
    return el
  })
}

export const state = () => ({
  addressList: [],
  selectedAddress: null
})

export const getters = {
  defaultAddress({addressList}) {
    return addressList.find(item => item.defaults === DEFAULT)
  },

  addressById({addressList}) {
    return id => addressList.find(item => item.id === id)
  }
}

//  mutation 必须同步执行
export const mutations = {
  updateList(state, payload) {
    if (!Array.isArray(payload)) return
    state.addressList = payload
  },

  setSelectedAddress(state, payload) {
    state.selectedAddress = payload
  },

  cleanSelectedAddress(state) {
    state.selectedAddress = null
  }
}

// Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
export const actions = {
  async getAddressList({commit}) {
    const res = await this.$axios.$get(userAddressList)
    if (res.code != 0) {
      Vue.$toast(res.msg)
      return Promise.reject(res)
    }
    commit('updateList', addFullAddress(res.payload))
    return res
  },

  async getAddressById({commit}, payload = {}) {
    if (!payload.id) {
      return Promise.reject(new Error('id is required'))
    }
    const res = this.$axios.$get(`${userAddressList}/${payload.id}`)
    if (res.code != 0) {
      Vue.$toast(res.msg)
      return Promise.reject(res)
    }
    return res
  },

  async modifyAddressById({dispatch}, payload = {}) {
    if (!payload.id) {
      return Promise.reject(new Error('id is required'))
    }
    const {
      id,
      memberId,
      postalCode,
      streetCode,
      streetName,
      fullAddress,
      ...rest
    } = payload
    const res = await this.$axios.$put(`${userAddressList}/${id}`, rest)
    if (res.payload) {
      await dispatch('getAddressList')
      return res
    } else {
      Vue.$toast(res.msg)
      return Promise.reject(res)
    }
  },

  async deleteAddressById({dispatch}, payload = {}) {
    if (!payload.id) {
      return Promise.reject(new Error('id is required'))
    }
    const res = await this.$axios.$delete(`${userAddressList}/${payload.id}`)
    if (res.payload) {
      Vue.$toast('删除成功')
      await dispatch('getAddressList')
      return res
    } else {
      Vue.$toast(res.msg)
      return Promise.reject(res)
    }
  },

  async addAddress({dispatch}, payload = {}) {
    const {
      id,
      memberId,
      postalCode,
      streetCode,
      streetName,
      fullAddress,
      ...rest
    } = payload
    const res = await this.$axios.$post(userAddressList, rest)
    if (res.payload) {
      await dispatch('getAddressList')
      return res
    } else {
      Vue.$toast(res.msg)
      return Promise.reject(res)
    }
  }
}
