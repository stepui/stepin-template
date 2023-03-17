<template>
  <div class="billing">
    <div class="card-list inline-flex">
      <bank-card bankName="浦发银行" theme="pufa" number="456211224594785" name="张XX" expires="22/11" />
      <bank-card bankName="平安银行" theme="pingan" number="456211224594782" name="张XX" expires="22/11" />
      <bank-card bankName="招商银行" theme="zhaoshang" number="456211224594252" name="张XX" expires="22/11" />
    </div>
    <div class="channel-list inline-block">
      <a-card class="pay-channel">
        <div class="channel-icon shadow-lg bg-primary-500 p-md block text-text-inverse rounded-lg">
          <money-collect-outlined style="font-size: 32px" />
        </div>
      </a-card>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import BankCard from './BankCard.vue';

  export default defineComponent({
    components: { BankCard },
    name: 'Billing',
    setup(props, { attrs, slots, emit }) {},
  });
</script>
<style lang="less" scoped>
  .billing {
    .card-list {
      :deep(.bank-card:not(:first-child)) {
        margin-left: calc(-320px);
        @apply shadow-md;
      }
      :deep(.bank-card) {
        transition: all 0.25s ease-in-out;
        &:hover {
          z-index: 20 !important;
          transform: scale(1.05);
        }
        &:nth-child(1) {
          z-index: 3;
        }
        &:nth-child(2) {
          z-index: 2;
        }
        &:nth-child(3) {
          z-index: 1;
        }
      }
    }
    .channel-list {
      .pay-channel {
        @apply rounded-lg inline-block mt-2;
        .channel-icon {
          @apply inline-block;
        }
      }
    }
  }
</style>
