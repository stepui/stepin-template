<template>
  <div style="height: 240px" ref="container" class="bar-chart"></div>
</template>
<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, PropType, ref } from 'vue';
  import { EChartsType, Color } from 'echarts';
  import * as echarts from 'echarts';

  const container = ref<HTMLElement>();

  let chart: EChartsType | null = null;

  const props = defineProps({
    color: Array as PropType<Color[]>,
    list: Array,
  });

  function resize() {
    chart?.resize();
  }

  onMounted(() => {
    chart = echarts.init(container.value!);
    chart.setOption({
      color: props.color ?? ['#ff0000'],
      backgroundColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#00369e',
          },
          {
            offset: 0.33,
            color: '#005cfd',
          },
          {
            offset: 1,
            color: '#a18dff',
          },
        ],
      },
      grid: [
        {
          top: 40,
          left: 56,
          right: 20,
          bottom: 40,
        },
      ],
      xAxis: [
        {
          name: '时间',
          nameTextStyle: { color: 'rgba(0, 0, 0, 0)' },
          type: 'category',
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { color: '#fff' },
          splitLine: {
            show: false,
          },
        },
      ],
      darkMode: true,
      yAxis: [
        {
          name: '销售额',
          nameTextStyle: { color: 'rgba(0, 0, 0, 0)' },
          type: 'value',
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { color: '#fff' },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              width: 2,
              color: 'rgba(255, 255, 255, 0.25)',
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: 24,
          itemStyle: {
            borderRadius: 4,
          },
          data: props.list,
        },
      ],
    });
    window.addEventListener('resize', resize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
  });
</script>
<style scoped lang="less">
  .bar-chart {
    :deep(canvas) {
      @apply rounded-lg;
    }
  }
</style>
