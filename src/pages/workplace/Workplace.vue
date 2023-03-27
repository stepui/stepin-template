<template>
  <div class="workplace grid grid-rows-none gap-4 mt-xxs">
    <div class="bg-container p-base rounded-b-lg rounded-tr-lg pt-8 flex items-end justify-between">
      <div class="flex items-center">
        <img src="@/assets/avatar/face-1.jpg" class="w-16 h-16 rounded-full" />
        <div class="ml-base">
          <div class="text-title font-bold text-lg">上午好，Jacob，欢迎回来</div>
          <div class="text-subtext font-bold text-sm">CEO / Co-Founder</div>
        </div>
      </div>
      <div class="flex items-start">
        <a-statistic class="w-20" :valueStyle="{ fontWeight: 500 }" title="项目" value="8"></a-statistic>
        <a-statistic class="w-20" :valueStyle="{ fontWeight: 500 }" title="订单" value="23"></a-statistic>
        <a-statistic class="w-20" :valueStyle="{ fontWeight: 500 }" title="销售额">
          <template #formatter>
            <div><span class="text-base">￥</span>2,300</div>
          </template>
        </a-statistic>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <mini-statistic-card
        class="card col-span-12 mdx:col-span-6 xlx:col-span-3"
        v-for="(item, i) in statisticList"
        :key="i"
        :title="item.title"
        :value="item.value"
      >
        <template #icon>
          <component
            :class="`text-[96px] translate-x-[25%] translate-y-[25%] opacity-75 ${item.iconClass}`"
            v-bind:is="item.icon"
          />
        </template>
      </mini-statistic-card>
    </div>
    <div class="overview grid grid-cols-12 gap-4">
      <active-users class="col-span-12 xlx:col-span-6 xxlx:col-span-5 drop-shadow-sm" />
      <sales-overview class="col-span-12 xlx:col-span-6 xxlx:col-span-7 drop-shadow-sm" />
    </div>
    <div class="project-list grid grid-cols-12 gap-4">
      <projects class="col-span-12 xlx:col-span-7 xxlx:col-span-8 drop-shadow-sm" />
      <order-history class="col-span-12 xlx:col-span-5 xxlx:col-span-4 drop-shadow-sm" />
    </div>
    <about-us />
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import MiniStatisticCard from '@/components/statistic/MiniStatisticCard.vue';
  import ActiveUsers from './ActiveUsers.vue';
  import SalesOverview from './SalesOverview.vue';
  import Projects from './Projects.vue';
  import OrderHistory from './OrderHistory.vue';
  import AboutUs from './AboutUs.vue';
  import { useUnbounded } from '@/utils/useTheme';

  useUnbounded();

  const statisticList = reactive([
    {
      title: '今日销售额',
      value: '￥53,000',
      change: '+31%',
      icon: 'dollar-circle-filled',
      iconClass: 'text-blue-100',
    },
    {
      title: '今日新增用户',
      value: '138',
      change: '+23%',
      icon: 'usergroup-add-outlined',
      iconClass: 'text-purple-100',
    },
    {
      title: '今日新增客户',
      value: '￥5000',
      change: '30%',
      icon: 'heart-filled',
      iconClass: 'text-primary-100',
    },
    {
      title: '今日订单量',
      value: '3200',
      change: '-11%',
      icon: 'shopping-filled',
      iconClass: 'text-green-100',
    },
  ]);
</script>

<style scoped lang="less">
  .workplace {
  }
</style>
