<template>
  <div class="avatar-list">
    <a-avatar
      :style="`margin-left: -${size / 2 + 2}px`"
      v-for="(item, i) in source"
      :size="size"
      :key="i"
      :src="item.avatar"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export type AvatarType = {
    nickname: string;
    avatar: string;
  };

  export default defineComponent({
    name: 'AvatarList',
    props: {
      source: Array as PropType<AvatarType[]>,
      size: {
        type: Number,
        default: 22,
        required: false,
      },
    },
    setup(props, { attrs, slots, emit }) {},
  });
</script>
<style lang="less" scoped>
  .avatar-list {
    :deep(.ant-avatar) {
      @apply border-white border-2 cursor-pointer;
    }
  }
</style>
