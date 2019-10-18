<template>
  <div class="topic-rule">
    <slot name="title">
      <topic-title v-if="title">{{ title }}</topic-title>
    </slot>
    <div class="topic-rule-detail">
      <slot>
        <p>
          1、被推荐人成功购买一个面膜推荐人可以获被推荐人成功购买一个面膜推荐人可以获
        </p>
        <p>
          2、被推荐人成功购买一个面膜推荐人可以获被推荐人成功购买一个面膜推荐人可以获被推荐人成功购买一个面膜推荐人可以获
        </p>
        <p>
          3、被推荐人成功购买一个面膜推荐人可以获被推荐人成功购买一个面膜推荐人可以获被推荐人成功购买一个面膜推荐人可以获
        </p>
        <p>4、被推荐人成功购买一个面膜推荐人可以获</p>
        <p>5、被推荐人成功购买一个面膜推荐人可以获</p>
      </slot>
    </div>
  </div>
</template>

<script>
import TopicTitle from './title'
export default {
  components: {TopicTitle},
  props: {
    title: {
      type: String,
      default: '活动明细'
    }
  }
}
</script>

<style lang="stylus">
.topic-rule {
  box-sizing: border-box;
  padding-bottom: 20px;

  .topic-rule-detail {
    width: 92%;
    text-align: justify;
    font-size: 12px;
    color: #666;
    margin: 0 auto;
  }
}
</style>
