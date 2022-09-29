<template>
  <header>
    <nav class="nav">
      <a>关于我们</a>
      <a>联系我们</a>
      <a
        href="https://www.zhipin.com/job_detail/292c5eb2e85e68631XZy2tq7FldR.html?ka=comp_joblist_1_blank&lid=1pwyzyz5K6Y.search.1&securityId=undefined"
        target="_blank"
        >加入我们</a
      >
    </nav>
  </header>
  <div class="container">
    <div class="banner" />
  </div>
  <footer>
    <div>
      <a href="beian.miit.gov.cn">闽ICP备2022013743号-1</a>
    </div>
    <div>©2022-2022 福州市顽国谜迹娱乐有限公司</div>
  </footer>
</template>

<script lang="ts" setup>
  import bannerImage from '@/assets/images/portal-banner.jpg';
</script>

<script lang="ts">
  export default {
    name: 'Portal'
  };
</script>

<style lang="less" scoped>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    min-width: inherit;
    background: black;
    text-align: center;
    .nav {
      a {
        display: inline-block;
        color: #fff;
        font-size: 18px;
        line-height: 50px;
        padding: 0 20px;
      }
    }
  }
  .container {
    margin-top: 50px;
    height: calc(100vh - 50px);
    min-width: inherit;

    .banner {
      height: 100%;
      background-image: url('@/assets/images/portal-banner.jpg');
      background-position: center center;
      /* 背景图不平铺 */
      background-repeat: no-repeat;
      /* 让背景图基于容器大小伸缩 */
      background-size: cover;
    }
  }
  footer {
    min-width: inherit;
    background: black;
    color: white;
    text-align: center;
    padding: 20px;
    div {
      margin-top: 10px;
    }
  }
</style>
