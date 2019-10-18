import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

process.env.NODE_ENV === 'production' &&
  Sentry.init({
    dsn: 'https://92957fa02999467eacebe052b847a89c@sentry.io/1438908',
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true
      })
    ]
  })
