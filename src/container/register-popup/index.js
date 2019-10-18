import Vue from 'vue'
import Popup from './popup.vue'

const PopupConstructor = Vue.extend(Popup)

// popup instance
let instance = null

// nuxt context instance
let $vm = null

const RegisterPopup = {
  name: 'register',
  /**
   * 弹出
   *
   * @param {Vue} $root instance
   * @param {*} options
   */
  open(vm, options) {
    if (Vue.prototype.$isServer) return

    if (instance) {
      instance.visible = true
      // TODO 参数
    } else {
      instance = new PopupConstructor({
        data: options || {}
      })
      instance.visible = true
      instance.$mount()
      document.body.appendChild(instance.$el)
      instance.dom = instance.$el
    }

    // 设置当前实例
    if (!vm && $vm) vm = $vm
    instance._setInstance(vm)
  },
  /**
   * 关闭隐藏
   *
   * @param {force} 强制关闭
   */
  close(force) {
    if (instance) instance.close(force)
  },
  /**
   * 销毁
   */
  destroy() {
    if (instance) {
      try {
        instance.$destroy()
        instance.dom.parentElement.removeChild(instance.dom)
      } catch (e) {
        // ignore
      }

      instance = null
    }
  },
  /**
   * 插件安装(Vue)
   */
  install(Vue, vm) {
    Vue.prototype.$register = RegisterPopup
    vm && ($vm = vm)
  }
}

export default RegisterPopup
