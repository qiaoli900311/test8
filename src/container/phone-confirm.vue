<template>
  <a :href="'tel:' + phone" ref="callPhone"></a>
</template>

<script>
import {RESERVATION_PHONE} from '@/const/common.js'

export default {
  data() {
    return {
      phone: RESERVATION_PHONE
    }
  },
  computed: {
    phoneDom() {
      return this.$refs.callPhone
    }
  },
  methods: {
    show(phone) {
      if (phone) {
        this.phone = phone
      } else {
        this.phone = RESERVATION_PHONE
      }

      this.$dialog.confirm({
        title: '',
        message: `拨打客服热线<br /> ${this.phone}`,
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            this.handleCall()
          }

          done()
        }
      })
    },
    handleCall() {
      this.phoneDom.click()
    }
  }
}
</script>

<style lang="stylus"></style>
