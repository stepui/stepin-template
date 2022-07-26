<template>
  <div class="billing flex">
    <bank-card
      bankName="浦发银行"
      theme="pufa"
      number="456211224594785"
      name="张XX"
      expires="22/11"
    />
    <bank-card
      bankName="平安银行"
      theme="pingan"
      number="456211224594782"
      name="张XX"
      expires="22/11"
    />
    <bank-card
      bankName="招商银行"
      theme="zhaoshang"
      number="456211224594252"
      name="张XX"
      expires="22/11"
    />
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
</style>
