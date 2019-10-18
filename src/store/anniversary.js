/*
  周年庆获取的用户信息
*/
export const state = () => ({
  anniversaryInfo: {
    member: null,
    nickName: null,
    openId: null,
    phone: null,
    memberId: null,
    attention: false
  }
})

export const mutations = {
  anniversaryInfoUpdate(state, payload) {
    state.anniversaryInfo = payload
  }
}
