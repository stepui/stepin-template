<template>
  <div class="overview-title">
    {{ title }}
    <div class="subtitle">
      {{ subtitle }}
      <span :class="{ change: true, up, down }">{{ change }}</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'OverviewTitle',
    props: {
      title: String,
      subtitle: String,
      change: [String, Number] as PropType<string | number>,
      up: { type: Boolean, required: false },
      down: { type: Boolean, required: false },
    },
    setup(props, { attrs, slots, emit }) {},
  });
</script>
<style scoped lang="less">
  .overview-title {
    @apply text-title font-bold text-base;
    .subtitle {
      @apply text-subtext text-xs;
      .change {
        @apply text-primary-500 text-sm ml-xs;
        &.up {
          @apply text-success-500;
        }
        &.down {
          @apply text-error-500;
        }
      }
    }
  }
</style>
