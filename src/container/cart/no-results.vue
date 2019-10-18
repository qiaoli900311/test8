<template>
  <div class="no-results">
    <img class="img" :src="projectEmpty" alt="暂无图片" />
    <div class="hint-txt font-s">- 没有记录 -</div>
  </div>
</template>

<script>
import {projectEmpty} from '@/const/picUrl.js'

export default {
  name: 'noResults',
  data() {
    return {
      projectEmpty
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/var.styl';

.no-results {
  position: relative;
  right: 0;
  left: 0;
  top: 0;
  margin: auto;
  width: 100vw;
  height: 280px;
  padding-top: 50px;
  text-align: center;

  .img {
    width: 220px;
    height: 185px;
    margin-bottom: 14px;
    box-sizing: border-box;
  }

  .hint-txt {
    color: #999;
    margin-bottom: 20px;
  }
}
</style>
