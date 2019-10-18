/*
  用户选择所在城市
  没有选择默认北京
*/
export const state = () => ({
  city: [
    {
      code: 110000,
      name: '北京市'
    },
    {
      code: 110100,
      name: '北京市'
    },
    {
      code: 510100,
      name: '成都市'
    }
  ]
})

export const mutations = {
  cityUpdate(state, payload) {
    state.city = payload
  }
}

export const getters = {
  /*
    @params {Number} 返回的城市级数
    @return {String}
    [{code:'',name: '广东省'},{code:'',name: '广州市'},{code:'',name: '天河区'}] => '广东省 | 广州市'
    [{code:'',name: '北京市'},{code:'',name: '北京市'},{code:'',name: '东城区'}] => '北京市'
  */
  cityName: state => (length = 2) => {
    let arr = state.city.slice(0, length).map(item => {
      return item.name
    })

    arr = Array.from(new Set(arr)).join(' | ')

    return arr
  },
  /*
    @return {Array} [110000,110100,110101]
  */
  cityCode(state) {
    return state.city.map(item => {
      // 存在只有省市 没有区的情况
      return (item && item.code) || ''
    })
  },
  /**
   * 用户区域代码
   */
  areaCode({city}) {
    return city[city.length - 1].code
  }
}
