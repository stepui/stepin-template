<script lang="ts" setup>
  import { ref, PropType } from 'vue';
  import dayjs from 'dayjs';

  export type Notice = {
    img: string;
    title: string;
    content: string;
    time: number;
  };

  export type NoticeGroup = {
    title: string;
    list: Notice[];
  };

  defineProps({
    dataSource: Array as PropType<NoticeGroup[]>,
  });

  const active = ref(0);
</script>
<template>
  <a-tabs class="w-60" v-model:active="active">
    <a-tab-pane :key="i" :tab="group.title" v-for="(group, i) in dataSource">
      <div class="list max-h-40 px-2 overflow-y-auto overflow-x-hidden">
        <div class="not-[:first-child]:mt-3 flex items-center" v-for="item in group.list">
          <img class="w-11 rounded-full" :src="item.img" />
          <div class="flex flex-col ml-2">
            <div class="text-title text-xs font-semibold">
              {{ item.title }}
              <span class="text-subtext text-xs ml-1 font-normal">
                {{ dayjs(item.time).format('hh:mm') }}
              </span>
            </div>
            <div class="text-subtext">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<style lang="less" scoped>
  :deep(.ant-tabs) {
    &-tab {
      @apply flex-1 justify-center;
    }
    &-nav {
      &-list {
        @apply w-full;
      }
    }
  }
</style>
