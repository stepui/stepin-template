<template>
  <div :class="`bank-card ${theme} p-md text-text-inverse rounded-xl flex flex-col justify-between`">
    <div class="font-bold" style="font-size: 16px">{{ bankName }}</div>
    <splitter class="number text-xl font-bold" :value="number" :sensitive="[2, 12]" />
    <div class="flex items-end justify-between tab-[12]">
      <div class="flex items-end">
        <a-statistic title="持卡人" :value="name"></a-statistic>
        <a-statistic class="ml-md" title="到期日期" :value="expires"></a-statistic>
      </div>
      <div class="logo">
        <img style="width: 60px" src="@/assets/image/union-pay-logo-1.jpg" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Splitter from '@/components/format/Splitter.vue';

  export default defineComponent({
    name: 'BankCard',
    props: {
      theme: {
        default: 'zhaoshang',
        type: String,
      },
      bankName: String,
      number: String,
      name: String,
      expires: String,
    },
    setup(props, { attrs, slots, emit }) {},
    components: { Splitter },
  });
</script>
<style lang="less" scoped>
  .bank-card {
    &.zhaoshang {
      background: linear-gradient(135deg, #ff667b, #c1001a);
    }
    &.pingan {
      background: linear-gradient(135deg, #fe8b4e, #e95505);
    }
    &.pufa {
      background: linear-gradient(135deg, #4757b4, #212a5f);
    }
    height: 200px;
    width: 380px;
    :deep(.ant-statistic) {
      @apply -mb-1;
      &:not(:first-child) {
        @apply ml-8;
      }
      .ant-statistic-title {
        @apply text-text-inverse text-xs;
      }
      .ant-statistic-content {
        @apply text-text-inverse font-bold text-base;
      }
    }
  }
</style>
