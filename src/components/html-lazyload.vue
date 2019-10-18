<template>
  <renderer :content="content" @onrenderer="bindLazyload"></renderer>
</template>

<script>
import renderer from './html-renderer.vue'
/**
 * lazyload 框架选择
 * 由于现在的框架没有做针对资源路径处理的接口
 * eg. https://image.deepexi.com/1.png
 * ==> https://image.deepexi.com/1.png?w=200&h=200
 * 对于CDN和现在的代理图片不能很好的兼容
 * 暂时先用自己写的简陋版lazyload
 */
import lazyload from '@/utils/lazyLoad.js'
export default {
  components: {renderer},
  props: {
    // html 字符串
    content: {
      type: String,
      require: true
    },
    // lazyload 的 options
    config: {
      type: Object,
      default: function() {
        return {
          bufferMargin: 0,
          loadingClassName: '',
          threshold: 0,
          formatUrl: v => v,
          throttleTime: 20
        }
      }
    },
    // 需要懒加载的元素
    selector: {
      type: String,
      default: 'img'
    },
    // 资源属性
    srcAttr: {
      type: String,
      default: 'src'
    },
    // 图片信息属性
    widthAttr: {
      type: String,
      default: 'w'
    },
    // 比例信息属性
    ratioAttr: {
      type: String,
      default: 'ratio'
    }
  },
  data() {
    return {
      placeholderImage:
        'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      defaultConfig: {
        bufferMargin: 0,
        loadingClassName: '',
        threshold: 0,
        formatUrl: v => v,
        throttleTime: 20
      }
    }
  },
  computed: {
    newConfig() {
      return Object.assign({}, this.defaultConfig, this.config)
    }
  },
  methods: {
    bindLazyload($content) {
      // TODO: 绑定懒加载
      this.defaultConfig.root = $content
      const screenWidth = this.screenWidth($content)
      const lazyloadElements = this.getLazyElements($content)
      for (let i = 0; i < lazyloadElements.length; i++) {
        const $image = lazyloadElements[i]
        this.setImagePlaceholder($image, screenWidth)
      }
      lazyload(lazyloadElements, this.newConfig)
    },

    getLazyElements($content) {
      return $content.querySelectorAll(this.selector)
    },

    setImagePlaceholder($image, screenWidth) {
      // 获取图片信息
      const dataset = $image.dataset
      const w = dataset[this.widthAttr]
      const ratio = dataset[this.ratioAttr]

      // 设置占位图
      $image.src = this.placeholderImage

      // 添加loading 样式
      $image.classList.add(this.newConfig.loadingClassName)

      // 计算图片宽高
      $image.width = w > screenWidth ? screenWidth : w
      $image.height = $image.width * ratio
    },

    screenWidth($content) {
      const $root = this.root || $content
      return $content.clientWidth
    }
  }
}
</script>
