<template>
  <a-modal
    width="460px"
    v-model:visible="_visible"
    wrap-class-name="login-modal"
    :closable="false"
    :footer="null"
    :body-style="{ padding: 0 }"
  >
    <login-box />
  </a-modal>
</template>
<script lang="ts" setup>
  import LoginBox from './LoginBox.vue';
  import useModelValue from '@/utils/useModelValue';
  import { useAccountStore } from '@/store';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const props = defineProps({
    visible: { type: Boolean, default: undefined },
    unless: Array<String>,
  });

  const accountStore = useAccountStore();
  const route = useRoute();

  const emit = defineEmits<{
    (e: 'update:visible', visible?: boolean): void;
  }>();

  const _visible = computed({
    get(): boolean {
      return !!sVisible.value && !props.unless?.includes(route.fullPath);
    },
    set(val: boolean) {
      sVisible.value = val;
    },
  });

  const { value: sVisible } = useModelValue(
    () => props.visible ?? !accountStore.logged,
    (val) => emit('update:visible', val)
  );
</script>
<style lang="less">
  .login-modal .ant-modal-content {
    @apply bg-transparent;
  }
</style>
