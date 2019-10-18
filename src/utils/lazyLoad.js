import throttle from 'lodash.throttle'

function intersectionObserverLazyLoad(imageList = [], opts = {}) {
  const bufferMargin = opts.bufferMargin || 0
  const loadingClassName = opts.loadingClassName || ''
  const root = opts.root || ''
  const threshold = opts.threshold || 0
  const formatUrl =
    typeof opts.formatUrl === 'function' ? opts.formatUrl : value => value

  const defaultConfig = {
    threshold,
    root,
    rootMargin: `0px 0px ${bufferMargin}px 0px`
  }

  let imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let image = entry.target
        image.src = formatUrl(image.dataset.src)
        image.onload = function() {
          image.classList.remove(loadingClassName)
          observer.unobserve(image)
        }
      }
    })
  }, defaultConfig)

  // 绑定被观察的元素
  for (let i = 0; i < imageList.length; i++) {
    imageObserver.observe(imageList[i])
  }
}

function scrollLazyLoad(imageList = [], opts = {}) {
  let count = 0
  return function() {
    const bufferMargin = opts.bufferMargin || 0
    const loadingClassName = opts.loadingClassName || ''
    const formatUrl =
      typeof opts.formatUrl === 'function' ? opts.formatUrl : value => value

    let scrollTop = window.scrollY
    console.log(scrollTop)
    for (let i = count; i < imageList.length; i++) {
      let image = imageList[i]
      if (image.offsetTop < window.innerHeight + scrollTop + bufferMargin) {
        image.src = formatUrl(image.dataset.src)
        image.onload = function() {
          image.classList.remove(loadingClassName)
        }
        count++
      }
    }
    if (count === imageList.length) {
      opts.done(count)
    }
  }
}

/**
 * image lazyload
 *
 * @param {Dom []} [imageList=[]]
 * @param {Object} [opts={}]
 * @param {opts.String} [bufferMargin] 触发加载的提前量
 * @param {opts.String} [loadingClassName] loading样式的类名
 * @param {opts.Element} [root] 懒加载的根节点
 * @param {opts.Number} [threshold] IntersectionObserver 的交叉
 * @param {opts.Function} [formatUrl] 对即将load的资源路径的处理
 * @param {opts.Number} [throttleTime] 防抖的时间间隔，以免频繁触发事件
 *
 */
function lazyload(imageList = [], opts = {}) {
  const throttleTime = opts.throttleTime || 0

  if (imageList.length === 0) return

  // 新 web API 监控元素是否在可视范围
  if ('IntersectionObserver' in window) {
    intersectionObserverLazyLoad(imageList, opts)
  } else {
    let throttleLazyload = throttle(
      scrollLazyLoad(imageList, opts),
      throttleTime
    )
    opts = Object.assign(opts, {
      done: count => {
        document.removeEventListener('scroll', throttleLazyload)
        window.removeEventListener('resize', throttleLazyload)
      }
    })
    scrollLazyLoad(imageList, opts)()
    document.addEventListener('scroll', throttleLazyload)
    window.addEventListener('resize', throttleLazyload)
  }
}

export default lazyload
