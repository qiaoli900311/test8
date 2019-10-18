import Vue from 'vue'
import index from './index.vue'

const PointTipsConsturctor = Vue.extend(index)

let instance
let seed = 1

const PointTips = function(options = {}) {
  if (Vue.prototype.$isServer) return

  instance = new PointTipsConsturctor({
    data: options
  })

  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  Vue.prototype.$nextTick(() => {
    instance.dom = instance.vm.$el
    instance.dom.style.zIndex = seed++
  })
  return instance.vm
}

export default PointTips
