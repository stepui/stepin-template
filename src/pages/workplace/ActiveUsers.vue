<template>
  <div class="active-users card p-lg">
    <bar-chart
      :color="['#ffffff']"
      :list="[
        ['6/07', 250],
        ['6/12', 400],
        ['6/13', 300],
        ['6/14', 600],
        ['6/15', 900],
        ['6/16', 500],
        ['6/17', 700],
        ['6/18', 1000],
        ['6/19', 600],
      ]"
    />
    <div class="details">
      <OverviewTitle title="活跃用户" subtitle="同比上周" change="+23%" up />
      <div class="content">我们已经为您创建了多个选项放在一起，并定制成像素完美的页面。</div>
      <div class="statistics">
        <a-statistic :title="item.title" :value="item.value" v-for="(item, i) in statisticList" :key="i" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import BarChart from '@/components/chart/BarChart.vue';
  import OverviewTitle from '@/components/statistic/OverviewTitle.vue';

  export default defineComponent({
    name: 'ActiveUsers',
    components: { BarChart, OverviewTitle },
    setup(props, { attrs, slots, emit }) {
      const statisticList = reactive([
        { title: '用户数', value: '3.6K' },
        { title: '点击量', value: '534.2w' },
        { title: '销售额', value: '43.2w' },
        { title: '项目', value: '8' },
      ]);
      return { statisticList };
    },
  });
</script>
<style scoped lang="less">
  .active-users {
    .details {
      @apply mt-lg;
    }
    .content {
      @apply mt-md text-title;
    }
    .statistics {
      @apply flex mt-md;
      :deep(.ant-statistic) {
        @apply flex-1 flex flex-col-reverse;
        .ant-statistic-title {
          @apply text-xs -mt-1;
        }
        .ant-statistic-content {
          @apply font-bold;
        }
      }
    }
  }
</style>
