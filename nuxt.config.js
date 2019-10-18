require('dotenv').config()

const theme = require('./src/assets/theme')
const metaJson = require('./meta.json')
const materialJson = require('../../material.json')
const outputDir = `dist${metaJson.hash}`
const ossPath = `http://serverless-platform.deepexi.top/materials/${
  materialJson.materialId
}/${outputDir}`

const publicPath = process.env.NODE_ENV === 'production' ? ossPath : ''

const env = process.env
const isProd = env.MODE == 'prod'

/**
 * 公众号AppId
 * - 秀域: wx78369f3f9b98cce5
 * - 滴普测试: wxf790e5c90a07c718
 * - 滴普科技: wx0c998f08bd3a3938
 */
const wechatAppId = process.env.WECHAT_APP_ID || 'wxf790e5c90a07c718'

/**
 * jsApiTicket account
 * - 滴普测试: deepexitest
 * - 滴普科技: deepexi
 * - 滴普测试(test): showyu
 */
const wechatAccount = process.env.WECHAT_ACCOUNT || 'deepexitest'

/**
 * mta统计 sid号码
 * dev环境：500677830
 * test环境：500677828
 * pro环境：500677734
 */
const mtaSid = process.env.MTA_SID || '500677830'

// 不能以斜杠结尾
let apiServer = process.env.API_SERVER
// 必须以斜杠结尾

const config = {
  aliIconFont: '',
  env: {
    mock: {},
    dev: {
      // '/poc': 'http://192.168.11.91:7001'
      '/poc': 'http://47.92.95.20:7001'
      // '/poc_mengniu': 'http://localhost:7001',
      // '/poc': 'http://localhost:7001',
    }
  }
}

let axios = {
  proxy: true
}

// 如果生产指定apiServer, 则使用绝对路径请求api
if (isProd && apiServer) {
  axios = {
    proxy: false,
    baseURL: apiServer
  }
}

module.exports = {
  mode: 'spa',
  env: {
    NO_LOGIN: process.env.NO_LOGIN,
    wechatAppId,
    wechatAccount,
    apiServer,
    mtaSid
  },
  proxy: config.env[env.MODE],
  router: {
    mode: 'hash',
    middleware: []
  },
  /*
   ** Build configuration
   */

  generate: {
    dir: outputDir
  },
  build: {
    publicPath,
    extractCSS: true,
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: name => `${name}/style/less`
          },
          'vant'
        ]
      ]
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules
        .find(item => item.test.test('.less'))
        .oneOf.find(item => !item.resourceQuery)
        .use.find(
          item => item.loader === 'less-loader'
        ).options.modifyVars = theme
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '周大福商城',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'mobileweb'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://at.alicdn.com/t/font_1055964_4qzk9qwaadm.css'
      }
    ],
    script: []
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#1890ff'
  },
  css: [
    {src: '~assets/global.styl', lang: 'stylus'},
    {src: '~assets/common.styl', lang: 'stylus'}
  ],
  srcDir: 'src/',
  plugins: [
    {src: '~/plugins/axios'},
    {src: '~/plugins/vant'},
    {src: '~/plugins/filter'},
    {src: '~/plugins/components'},
    {src: '~/plugins/wechat'},
    {src: '~/plugins/interceptor'}
  ],
  modules: [['@nuxtjs/axios'], ['@nuxtjs/dotenv', {path: './'}]],
  axios
}
