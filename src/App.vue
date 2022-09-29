<template>
  <a-config-provider :locale="locale">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
  import useLocale from '@/hooks/locale';

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  });
</script>

<style lang="less">
  ::-webkit-scrollbar {
    // 滚动条的背景
    width: 15px;
    background: #f6f6f6;
    height: 14px;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    width: 20px;
    border: 5px solid transparent;
  }

  ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px transparent inset;
  }

  ::-webkit-scrollbar-thumb {
    //滚动条的滑块样式修改
    width: 20px;
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px #7c7c7c inset;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  #app {
    min-width: 1400px;
  }
</style>
