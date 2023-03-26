<script lang="ts" setup>
  import { ref, PropType, computed } from 'vue';
  import { PaginationProps } from 'ant-design-vue';

  const props = defineProps({
    pagination: { type: [Object, Boolean] as PropType<PaginationProps> },
    column: { type: Number, default: 8 },
    gap: [Array<Number>, Number],
    dataSource: { type: Array<any>, default: [] },
  });

  const _pagination = computed<PaginationProps>(() => {
    if (props.pagination && typeof props.pagination === 'boolean') {
      return {};
    }
    return props.pagination ?? {};
  });

  const list = computed(() => {
    if (typeof props.pagination === 'boolean' && !props.pagination) {
      return props.dataSource?.slice(0);
    }
    const { current = 1, pageSize = 10 } = _pagination.value;
    let start = 0;
    let end = pageSize;
    if (props.dataSource.length > pageSize) {
      start = (current - 1) * pageSize;
      end = current * pageSize;
    }
    return props.dataSource?.slice(start, end);
  });

  const col = computed(() => (list.value.length > 0 ? props.column : 1));
</script>
<template>
  <div
    v-bind="$attrs"
    class="grid-list grid"
    :style="`${column ? 'grid-template-columns:repeat(' + col + ', minmax(0, 1fr))' : ''}`"
  >
    <template v-if="list.length > 0" v-for="item in list">
      <slot name="renderItem" :item="item">
        {{ item }}
      </slot>
    </template>
    <template v-else>
      <a-empty />
    </template>
  </div>
  <a-pagination
    class="mt-3"
    v-if="pagination"
    v-bind="{ total: dataSource?.length, ...(pagination as PaginationProps) }"
  />
</template>
<style lang="less" scoped>
  .grid-list {
  }
</style>
