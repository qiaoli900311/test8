<template>
  <div class="address-item">
    <!-- the top of item include address information & the left or right icon -->
    <div
      class="address-item__info"
      :class="{
        'address-item__info--left': $slots[slots.leftIcon],
        'address-item__info--right': $slots[slots.rightIcon]
      }"
    >
      <!-- the left icon slot -->
      <div
        class="address-item__icon--left address-item__icon"
        v-if="$slots['left-icon']"
      >
        <slot name="left-icon"></slot>
      </div>

      <!-- user info -->
      <div class="address-item__user">
        <slot></slot>
        <span class="address-item__user--name">{{ data.receiver }}</span>
        <span class="address-item__user--phone">{{ data.phone }}</span>
      </div>

      <!-- address -->
      <div class="address-item__address">{{ data.fullAddress }}</div>

      <!-- the right icon slot -->
      <div
        class="address-item__icon--right address-item__icon"
        v-if="$slots['right-icon']"
      >
        <slot name="right-icon"></slot>
      </div>
    </div>

    <!-- extend slot -->
    <div class="van-hairline--top" v-if="$slots[slots.add]"></div>
    <div class="address-item__add" v-if="$slots[slots.add]">
      <slot name="add"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'address-item',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      // slots name
      slots: {
        add: 'add',
        leftIcon: 'left-icon',
        rightIcon: 'right-icon'
      }
    }
  }
}
</script>
