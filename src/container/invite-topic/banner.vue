<template>
  <div class="topic-banner">
    <div class="topic-banner-posters">
      <template v-if="mode === 'single'">
        <div class="slot-div" v-for="(item, index) in banners" :key="index">
          <img v-lazy="item" class="banner" />
          <slot :name="'btn' + index"></slot>
        </div>
      </template>
    </div>
    <van-popup
      v-model="shareTipsVisible"
      class="poster-popup"
      :overlay="false"
      @click.native.self="handleTipsClick"
    >
      <img :src="posterWithQrcode" alt />
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import {Lazyload} from 'vant'
import QRCodeImpl from 'qr.js/lib/QRCode'
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
import {ACT_INVITE_ACTIVITY_TYPE} from '@/const/common.js'
Vue.use(Lazyload)
export default {
  name: 'topic-banner',
  props: {
    mode: {
      type: String,
      default: 'single',
      validator: function(value) {
        return ['single', 'swipe'].indexOf(value) > -1
      }
    },
    banners: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      position: [0.68, 0.83],
      shareTipsVisible: false,
      posterOnload: false,
      qrcodeOnload: false,

      posterWithQrcode: ''
    }
  },
  computed: {
    createFinish() {
      return this.posterOnload && this.qrcodeOnload
    }
  },
  watch: {
    createFinish: function(value) {
      if (value) {
        this.$toast.clear()
      }
    }
  },
  methods: {
    handleTipsClick() {
      this.shareTipsVisible = false
    },
    //set qrcode postion and size
    chooseQrcodeParams(activityId) {
      let qrcodeParams = {
        size: 150,
        level: 'L',
        bgColor: '#ffffff',
        fgColor: '#000000',
        padding: 10
      }

      if (activityId === ACT_INVITE_ACTIVITY_TYPE.MASK) {
        qrcodeParams.size = 180
        qrcodeParams.padding = 0

        this.position = [0.666, 0.817]
      } else if (activityId === ACT_INVITE_ACTIVITY_TYPE.GIFT_A) {
        this.position = [0.67, 0.779]
        qrcodeParams.size = 180
        qrcodeParams.padding = 10
      } else if (activityId === ACT_INVITE_ACTIVITY_TYPE.GIFT_B) {
        qrcodeParams.padding = 10
        qrcodeParams.size = 180
        this.position = [0.67, 0.779]
      }

      return qrcodeParams
    },
    showPoster(url, poster, activityId) {
      //Reinitial the qrcode
      this.posterWithQrcode = ''
      this.qrcodeOnload = false

      !this.createFinish &&
        this.$toast.loading({
          message: '生成中...',
          duration: 0,
          forbidClick: true,
          mask: true
        })

      this.shareTipsVisible = true
      this.createPoster(url, poster, activityId)
    },

    createCanvas(mode) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext(mode || '2d')
      return {
        ctx,
        canvas
      }
    },

    createPoster(url, poster, activityId) {
      const {size} = this.chooseQrcodeParams(activityId)
      if (!poster || !url) return
      const {canvas, ctx} = this.createCanvas()

      this.loadImage(poster)
        .then(poster => {
          const qrcode = this.createQrcode(url, activityId)
          this.posterOnload = this.qrcodeOnload = true

          const {width, height} = poster
          canvas.width = width
          canvas.height = height
          ctx.drawImage(poster, 0, 0, width, height)

          const qrcodeX = width * this.position[0]
          const qrcodeY = height * this.position[1]
          ctx.drawImage(
            qrcode,
            0,
            0,
            qrcode.width,
            qrcode.height,
            qrcodeX,
            qrcodeY,
            size,
            size
          )

          this.posterWithQrcode = canvas.toDataURL('image/png')
        })
        .catch(e => {
          this.posterOnload = this.qrcodeOnload = true
          this.$toast('加载海报失败')
        })
    },

    createQrcode(url, activityId) {
      const {size, level, bgColor, fgColor, padding} = this.chooseQrcodeParams(
        activityId
      )
      const {canvas, ctx} = this.createCanvas()

      const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level])
      qrcode.addData(url)
      qrcode.make()

      const cells = qrcode.modules
      const tileW = size / cells.length
      const tileH = size / cells.length
      const scale = window.devicePixelRatio || 1
      canvas.height = canvas.width = (size + padding * 2) * scale
      ctx.scale(scale, scale)
      // 增加padding
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.height, canvas.width)

      cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
          ctx.fillStyle = cell ? fgColor : bgColor
          const w = Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW)
          const h = Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH)
          ctx.fillRect(
            Math.round(cdx * tileW) + padding,
            Math.round(rdx * tileH) + padding,
            w,
            h
          )
        })
      })
      return canvas
    },

    loadImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = 'anonymous'
        image.src = url
        image.onload = function() {
          resolve(this)
        }
        image.onerror = function(e) {
          reject(e)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.topic-banner {
  width: 100%;
  min-height: 300px;

  .topic-banner-posters {
    .banner {
      width: 100%;
    }
  }

  .poster-popup {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);

    img {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
}
</style>
