<template>
  <div class="workplace grid grid-rows-none gap-4">
    <div class="grid grid-cols-12 gap-6 my-2">
      <mini-statistic-card
        @click="onClick(item)"
        class="card col-span-12 mdx:col-span-6 xlx:col-span-3"
        v-for="(item, i) in statisticList"
        :key="i"
        :title="item.title"
        :value="item.value"
      >
        <template #icon>
          <span
            class="p-3 shadow-lg bg-primary-500 align-middle text-inverse inline-flex items-center rounded-lg"
          >
            <component class="text-2xl" v-bind:is="item.icon" />
          </span>
        </template>
      </mini-statistic-card>
    </div>
    <div class="overview grid grid-cols-12 gap-4">
      <active-users class="col-span-12 xlx:col-span-6 xxlx:col-span-5" />
      <sales-overview class="col-span-12 xlx:col-span-6 xxlx:col-span-7" />
    </div>
    <div class="project-list grid grid-cols-12 gap-4">
      <projects class="col-span-12 xlx:col-span-7 xxlx:col-span-8" />
      <order-history class="col-span-12 xlx:col-span-5 xxlx:col-span-4" />
    </div>
    <about-us />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { mapActions } from 'vuex';
  import MiniStatisticCard from '/@/components/statistic/MiniStatisticCard.vue';
  import ActiveUsers from './ActiveUsers.vue';
  import SalesOverview from './SalesOverview.vue';
  import Projects from './Projects.vue';
  import OrderHistory from './OrderHistory.vue';
  import AboutUs from './AboutUs.vue';

  export default defineComponent({
    name: 'Workplace',
    components: {
      MiniStatisticCard,
      ActiveUsers,
      SalesOverview,
      Projects,
      OrderHistory,
      AboutUs,
    },
    setup() {
      const statisticList = reactive([
        {
          title: '今日销售额',
          value: '￥53,000',
          change: '+31%',
          icon: 'dollar-circle-filled',
        },
        {
          title: '今日新增用户',
          value: '138',
          change: '+23%',
          icon: 'usergroup-add-outlined',
        },
        {
          title: '今日新增客户',
          value: '￥5000',
          change: '30%',
          icon: 'heart-filled',
        },
        {
          title: '今日订单量',
          value: '3200',
          change: '-11%',
          icon: 'shopping-filled',
        },
      ]);
      return {
        statisticList,
        title: ref('hello'),
      };
    },
    methods: {
      ...mapActions(['setTheme']),
      onClick(item: any) {
        item.title = 'test';
      },
    },
    mounted() {
      this.setTheme('unbounded');
    },
    activated() {
      this.setTheme('unbounded');
    },
    deactivated() {
      this.setTheme('common');
    },
    unmounted() {
      this.setTheme('common');
    },
  });
</script>

<style scoped lang="less">
  .workplace {
  }
</style>
