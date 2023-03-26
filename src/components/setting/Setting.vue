<script lang="ts" setup>
  import { LabelWrapper } from 'stepin';
  import { useSettingStore, storeToRefs } from '@/store';

  const { navigation, useTabs } = storeToRefs(useSettingStore());
</script>
<template>
  <div class="setting px-md">
    <LabelWrapper justify="between" label="多页签">
      <a-switch v-model:checked="useTabs" />
    </LabelWrapper>
    <LabelWrapper justify="between" label="导航模式">
      <a-radio-group v-model:value="navigation" button-style="solid">
        <a-radio-button value="side">侧边导航</a-radio-button>
        <a-radio-button value="head">顶部导航</a-radio-button>
        <a-radio-button value="mix">混合导航</a-radio-button>
      </a-radio-group>
    </LabelWrapper>
  </div>
</template>
<style scoped lang="less"></style>
