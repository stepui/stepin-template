<script lang="ts" setup>
  import { LabelWrapper } from 'stepin';
  import { useSettingStore } from '@/store';
  const setting = useSettingStore();
</script>
<template>
  <div class="setting px-md">
    <LabelWrapper justify="between" label="导航模式">
      <a-radio-group v-model:value="setting.navigation" button-style="solid">
        <a-radio value="side">侧边</a-radio>
        <a-radio value="head">顶部</a-radio>
        <a-radio style="margin-right: 0" value="mix">混合</a-radio>
      </a-radio-group>
    </LabelWrapper>
    <LabelWrapper justify="between" label="多页签">
      <a-switch v-model:checked="setting.useTabs" />
    </LabelWrapper>
    <LabelWrapper justify="between" label="过滤菜单">
      <a-switch v-model:checked="setting.filterMenu" />
    </LabelWrapper>
  </div>
</template>
<style scoped lang="less"></style>
