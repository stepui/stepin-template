<script lang="ts" setup>
  import { reactive } from 'vue';

  const groups = reactive([
    {
      title: 'ACCOUNT',
      children: [
        { checked: false, label: 'Email me when someone follows me' },
        { checked: true, label: 'Email me when someone answers me' },
        { checked: true, label: 'Email me when someone mentions me' },
      ],
    },
    {
      title: 'APPLICATION',
      children: [
        { checked: true, label: 'New launches and projects' },
        { checked: false, label: 'Monthly product updates' },
        { checked: true, label: 'Subscribe to newsletter' },
      ],
    },
  ]);
</script>
<template>
  <a-card
    :bordered="false"
    title="Platform Settings"
    class="shadow-lg platform-setting rounded-xl"
  >
    <div class="group" v-for="(group, i) in groups">
      <div class="text-xs font-medium text-subtext mb-6">
        {{ group.title }}
      </div>
      <div class="group-list">
        <div
          class="group-list-item flex items-center"
          v-for="item in group.children"
        >
          <a-switch v-model:checked="item.checked" class="mr-2" />
          {{ item.label }}
        </div>
      </div>
    </div>
  </a-card>
</template>
<style lang="less" scoped>
  .platform-setting {
    :deep(.ant-card-head) {
      @apply border-none;
      .ant-card-head-title {
        @apply font-semibold;
      }
    }
    :deep(.ant-card-body) {
      @apply pt-2;
    }
    .group {
      &:not(:first-child) {
        @apply mt-6;
      }
      &-list {
        &-item {
          &:not(:first-child) {
            @apply mt-6;
          }
        }
      }
    }
  }
</style>
