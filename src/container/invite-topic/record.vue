<template>
  <div class="topic-record">
    <slot name="title">
      <topic-title v-if="title">{{ title }}</topic-title>
    </slot>
    <div class="topic-reocrd-desc">
      <slot name="desc"></slot>
    </div>
    <div class="scroll-wrapper" v-if="data.length !== 0">
      <ul class="topic-record-list">
        <slot v-bind="data" name="list">
          <li
            v-for="(item, index) in data"
            :key="index"
            class="topic-record-item"
          >
            <img :src="item.avatarUrl" alt="" class="avatar" />
            <span class="nickName">{{ item.nickName }}</span>
            <span class="date">{{
              item.createdAt | formatDateTime('YYYY-MM-DD HH:mm')
            }}</span>
          </li>
        </slot>
      </ul>
    </div>
    <div class="topic-record-list" v-else>
      <p>暂时没有记录</p>
    </div>
    <div class="topic-record-action">
      <div class="van-hairline--top"></div>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
import TopicTitle from './title'
export default {
  components: {TopicTitle},
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
.topic-record {
  .topic-reocrd-desc {
    width: 92%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    color: #666;
    margin: 0 auto 15px;
    font-size: 16px;
  }

  .scroll-wrapper {
    width: 100%;
    max-height: 40vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .topic-record-list {
    width: 92%;
    margin: 0 auto;
    min-height: 40px;

    > p {
      margin: 10px 0;
    }

    .topic-record-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      margin-bottom: 10px;

      .avatar {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 100%;
      }

      .nickName {
        flex: 1;
        text-align: left;
        margin: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .topic-record-action {
    width: 92%;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: relative;

    .van-hairline--top {
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
}
</style>
