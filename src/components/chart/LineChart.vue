<template>
  <div
    style="width: 100%; height: 400px"
    class="line-chart"
    ref="container"
  ></div>
</template>
<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref, nextTick } from 'vue';
  import type { EChartsType } from 'echarts';
  import * as echarts from 'echarts';

  let chart: EChartsType | null = null;
  const container = ref<HTMLElement>();

  function resize() {
    chart?.resize();
  }

  onMounted(() => {
    chart = echarts.init(container.value!);
    chart.setOption({
      color: ['#005af9', '#985af9'],
      grid: [
        {
          top: 100,
          left: 32,
          right: 12,
          bottom: 20,
        },
      ],
      xAxis: [
        {
          name: '时间',
          nameTextStyle: { color: 'rgba(0 , 0, 0, 0)' },
          type: 'category',
          axisTick: { show: false },
          axisLine: { show: false },
          boundaryGap: 0,
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          name: '销售额',
          nameTextStyle: { color: 'rgba(0 , 0, 0, 0)' },
          type: 'value',
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              width: 2,
              color: 'rgba(0, 0, 0, 0.15)',
            },
          },
        },
      ],
      legend: {
        show: true,
        right: '8',
        top: 0,
        orient: 'vertical',
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          name: '销售额',

          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
          },
          data: [
            ['一月', 12],
            ['二月', 8],
            ['三月', 92],
            ['四月', 32],
            ['五月', 22],
            ['六月', 89],
            ['七月', 72],
          ],
        },
        {
          name: '订单',
          type: 'line',
          smooth: true,
          width: 4,
          lineStyle: {
            width: 3,
          },
          data: [
            ['一月', 12],
            ['二月', 8],
            ['三月', 24],
            ['四月', 32],
            ['五月', 56],
            ['六月', 56],
            ['七月', 56],
          ],
        },
      ],
    });
    window.addEventListener('resize', resize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
  });
</script>
