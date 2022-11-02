<template>
  <div
    class="mini-statistic-card bg-content inline-flex items-center justify-between drop-shadow-md p-md border-border rounded-lg"
  >
    <div class="statistic-main flex-1">
      <div class="statistic-title text-subtext text-xs">{{ title }}</div>
      <div class="statistic-content flex items-baseline">
        <span class="value text-title text-xxl font-bold">{{ value }}</span>
        <span class="suffix ml-1 text-xs text-green-500 font-bold">+30%</span>
      </div>
    </div>
    <div class="statistic-icon"><slot name="icon"></slot></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    props: {
      title: String,
      value: [String, Number] as PropType<string | number>,
    },
    name: 'MiniStatisticCard',
  });
</script>

<style lang="less" scoped>
  .mini-statistic-card {
  }
</style>
