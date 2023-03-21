<script lang="ts" setup>
  import { CloseOutlined } from '@ant-design/icons-vue';
  import { PropType, ref } from 'vue';
  import { AlertConfig } from './interface';

  type AlertType = 'warn' | 'info' | 'error';

  const props = defineProps({
    type: { type: String as PropType<AlertType> },
    message: String,
    duration: Number,
  });
  const containerId = 'alert-messages';

  const _type = ref('info');
  const _message = ref('');
  const _raw = ref(false);

  let interval: number | undefined = undefined;
  const _duration = ref(2000);
  defineExpose({
    show(message: string, type: AlertType, raw = false, duration = _duration.value) {
      _message.value = message;
      _type.value = type;
      marginTop.value = 0;
      _raw.value = raw;
      setHidden(duration);
    },
    config(config: AlertConfig) {
      if (config.duration) {
        _duration.value = config.duration;
      }
    },
  });

  const marginTop = ref(-34);
  const alert = ref<HTMLDivElement>();

  function setHidden(millSeconds: number) {
    if (millSeconds > 0) {
      clearInterval(interval);
      interval = setTimeout(forceHide, millSeconds) as unknown as number;
    }
  }

  function forceHide() {
    clearInterval(interval);
    marginTop.value = -alert.value!.clientHeight;
  }
</script>
<template>
  <Teleport :to="`#${containerId}`">
    <div
      ref="alert"
      :style="`margin-top: ${marginTop}px;`"
      :class="`alert-message transition-[margin-top] ease-out alert-message-${
        type ?? _type
      } flex items-center py-[6px] pl-md text-text-inverse`"
    >
      <div class="alert-message-content text-center flex-1">
        <slot>
          <div v-if="_raw" v-html="message ?? _message"></div>
          <template v-else>
            {{ message ?? _message }}
          </template>
        </slot>
      </div>
      <CloseOutlined class="mr-md text-[18px]" @click="forceHide" />
    </div>
  </Teleport>
</template>
<style scoped lang="less">
  .alert-message {
    &-error {
      @apply bg-error-400;
    }
    &-warn {
      @apply bg-warning-400;
    }
    &-info {
      @apply bg-purple-400;
    }
  }
</style>
