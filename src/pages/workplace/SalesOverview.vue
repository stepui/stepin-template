<template>
  <div class="sales-overview card p-lg">
    <OverviewTitle title="销售概览" subtitle="同比去年" change="+20%" up />
    <line-chart />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import LineChart from '@/components/chart/LineChart.vue';
  import OverviewTitle from '@/components/statistic/OverviewTitle.vue';

  export default defineComponent({
    components: { LineChart, OverviewTitle },
    name: 'SalesOverview',
    setup(props, { attrs, slots, emit }) {},
  });
</script>
<style scoped lang="less">
  .sales-overview {
    :deep(.line-chart) {
      @apply -mt-10;
    }
  }
</style>
