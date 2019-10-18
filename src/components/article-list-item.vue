<template>
  <van-row type="flex" align="center" class="article-listitem">
    <van-col class="article-listitem__thumbnail">
      <img :src="thumbMediaUrl | proxy" alt="秀域-缩略图" />
    </van-col>
    <van-col class="article-listitem__summary">
      <van-row class="title van-ellipsis" tag="p">
        {{ title }}
      </van-row>
      <van-row class="desc font-s van-ellipsis" tag="p">
        {{ digest }}
      </van-row>
      <van-row
        class="bottom"
        type="flex"
        :justify="author ? 'space-between' : 'end'"
      >
        <van-col span="8" class="van-ellipsis author font-m" v-if="author"
          >作者：{{ author }}</van-col
        >
        <van-col class="icon font-s">
          <slot></slot>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script>
import {imageProxy} from '@/const/api.js'
export default {
  props: {
    // 标题
    title: {
      type: String
    },
    // 摘要
    digest: {
      type: String
    },
    // 缩略图
    thumbMediaUrl: {
      type: String
    },
    // 作者
    author: {
      type: String
    }
  },
  filters: {
    proxy(value) {
      return `${imageProxy}?url=${value}`
    }
  }
}
</script>

<style lang="stylus">
.article-listitem {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 15px 15px 15px 5px;

  .article-listitem__thumbnail {
    width: 90px;
    height: 90px;
    position: relative;
    overflow: hidden;

    > img {
      position: absolute;
      max-height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .article-listitem__summary {
    margin-left: 5px;
    flex: 1;
    overflow: hidden;

    > p {
      margin: 0;
      text-align: justify;
    }

    .title {
      height: 20px;
      line-height: 20px;
      width: 100%;
      font-size: 15px;
      color: #333;
      font-weight: bold;
    }

    .desc {
      height: 40px;
      width: 100%;
      text-overflow: ellipsis;
      line-height: 20px;
      color: #999;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal !important;
      word-wrap: break-word;
    }

    .bottom {
      height: 30px;
      line-height: 30px;
      text-align: justify;

      .author {
        color: #333;
      }

      .icon {
        color: #666;
      }
    }
  }
}
</style>
