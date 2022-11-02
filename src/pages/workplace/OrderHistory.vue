<template>
  <div class="order-history card">
    <overview-title
      class="mb-7"
      title="订单记录"
      subtitle="本月新增"
      change="+24%"
      up
    />
    <a-timeline :reverse="reversed">
      <a-timeline-item
        v-for="(order, i) in orderList"
        :key="i"
        :class="`${order.status} ${
          i === orderList.length - 1 && !reversed ? 'dashed' : ''
        }`"
      >
        <div class="time-line-content flex items-center">
          <span class="money mr-1 text-primary-500 font-bold"
            >￥{{ formatThousand(order.amount) }}</span
          >-
          <span class="source ml-1">{{ order.remark }}</span>
        </div>
        <div class="time text-subtext text-xs">07/12 23:45 天猫商城</div>
      </a-timeline-item>
      <a-timeline-item class="tail">
        <div style="height: 28px">订单新增中...</div>
      </a-timeline-item>
    </a-timeline>
    <a-button
      type="primary"
      :class="{ 'reverse-btn': true, reversed, dashed: reversed }"
      @click="reverse"
    >
      翻转顺序
      <template #icon>
        <swap-outlined />
      </template>
    </a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import OverviewTitle from '@/components/statistic/OverviewTitle.vue';
  import { formatThousand } from '@/utils/formatter';

  export default defineComponent({
    components: { OverviewTitle },
    name: 'OrderHistory',
    setup(props, { attrs, slots, emit }) {
      return {
        formatThousand,
        reversed: ref(false),
        orderList: reactive([
          {
            amount: 5000,
            remark: 'stepin ui 高级组件套装',
            time: '07/12 23:45',
            market: '天猫商城',
            status: 'completed',
          },
          {
            amount: 2398,
            remark: 'stepin ui 高级表格组件（一年版）',
            time: '07/12 23:45',
            market: '天猫商城',
            status: 'completed',
          },
          {
            amount: 45000,
            remark: 'stepin pro 在线课 20 课时',
            time: '07/12 23:45',
            market: '天猫商城',
            status: 'process',
          },
          {
            amount: 3129,
            remark: 'stepin pro 定制页面10个',
            time: '07/12 23:45',
            market: '天猫商城',
            status: 'process',
          },
          {
            amount: 52.46,
            remark: 'stepin pro 定制组件1个',
            time: '07/12 23:45',
            market: '天猫商城',
            status: 'process',
          },
          {
            amount: 8891,
            remark: 'stepin ui 高级版一套（退款）',
            time: '07/12 23:45',
            market: '天猫商城',
            status: 'canceled',
          },
        ]),
      };
    },
    methods: {
      reverse() {
        this.reversed = !this.reversed;
      },
    },
  });
</script>
<style lang="less" scoped>
  .order-history {
    @apply relative;
    .reverse-btn {
      @apply flex items-center justify-center absolute bottom-6 left-4 right-4;
      :deep(.anticon) {
        transform: rotate(90deg) rotateY(0deg);
        transition: all 0.25s ease-in;
      }
      &.reversed {
        :deep(.anticon) {
          transform: rotate(90deg) rotateY(180deg);
        }
      }
    }
    :deep(.ant-timeline) {
      .ant-timeline-item-content {
        top: -5px;
      }
      .ant-timeline-item-tail {
        height: calc(100% - 7px);
        top: 7px;
        left: 6px;
      }
      .ant-timeline-item-head {
        border-width: 3px;
        height: 14px;
        width: 14px;
      }
      .ant-timeline-item {
        &.canceled .time-line-content {
          .money {
            @apply line-through text-disabled;
          }
        }
        &.completed .ant-timeline-item-head {
          @apply border-success-500;
        }
        &.canceled .ant-timeline-item-head {
          @apply border-disabled;
        }
        &.dashed .ant-timeline-item-tail {
          @apply border-dashed;
        }
        &.tail .ant-timeline-item-head {
          @apply border-disabled opacity-30;
        }
      }
    }
  }
</style>
