/*
  确认订单页面
*/
const sessionKey = 'confirmOrder'
const bestPlanKey = 'bestPlan'

export const state = () => ({
  // 商品列表 后期会有多个
  productList: [],
  // 购物车最终结果
  bestPlan: null
})

export const mutations = {
  productUpdate(state, payload) {
    let data = payload.map(item => {
      // 商品最小购买数量 购买数量
      return Object.assign(item, {
        maxNum: item.maxNum || item.availableStock,
        minNum: 1,
        num: 1
      })
    })

    sessionStorage[sessionKey] = JSON.stringify(data)

    state.productList = data
  },
  bestPlanUpdate(state, payload) {
    let data = payload
    sessionStorage[bestPlanKey] = JSON.stringify(data)

    state.bestPlan = data
  }
}

export const getters = {
  products(state) {
    try {
      console.log(sessionStorage[sessionKey])
      return state.productList.length > 0
        ? state.productList
        : JSON.parse(sessionStorage[sessionKey])
    } catch (e) {
      return state.productList
    }
  },
  getBestPlan(state) {
    try {
      return state.bestPlan
        ? state.bestPlan
        : JSON.parse(sessionStorage[bestPlanKey])
    } catch (e) {
      return state.bestPlan
    }
  }
}
