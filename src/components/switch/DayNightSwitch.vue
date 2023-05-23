<script lang="ts" setup>
  import { PropType, watch, computed } from 'vue';
  import useModelValue from '@/utils/useModelValue';
  import cloneDeep from 'lodash/cloneDeep';
  import { storeToRefs } from 'pinia';
  import { useThemeStore, ThemeProvider } from 'stepin/es/theme-provider';

  export type Type = 'day' | 'night';

  const props = defineProps({
    value: { type: String as PropType<Type> },
    nightColor: { type: String, default: '#1D1D1D' },
  });

  const emit = defineEmits<{
    (e: 'update:value', value: Type): void;
  }>();

  const { value: _value } = useModelValue(
    () => props.value,
    (val) => emit('update:value', val),
    'day'
  );
  const switcher: { [key in Type]: Type } = {
    day: 'night',
    night: 'day',
  };

  const { theme } = storeToRefs(useThemeStore());

  // 监听主题色变换，更新缓存
  let cachedMiddleColors = cloneDeep(theme.value.color.middle);
  watch(
    theme,
    (val) => {
      if (val.color.middle['bg-base'] !== props.nightColor) {
        cachedMiddleColors = cloneDeep(val.color.middle);
        _value.value = 'day';
      } else {
        _value.value = 'night';
      }
    },
    { deep: true }
  );

  // 主题颜色配置
  const colorCfg = computed(() => {
    if (_value.value === 'day') {
      return { middle: cachedMiddleColors };
    }
    return { middle: { 'bg-base': props.nightColor } };
  });
</script>
<template>
  <ThemeProvider is-root :color="colorCfg">
    <div
      @click="() => (_value = switcher[_value])"
      class="bg-fill-2 day-night-switch hover:border-border relative border-border-2 text-lg rounded-full border border-solid flex items-center"
    >
      <div :class="`spot transition-[left] duration-300 h-full absolute rounded-full bg-container ${_value}`"></div>
      <IconFont :class="`day-night-switch-item ${_value === 'day' ? 'checked' : ''}`" name="icon-sun" />
      <IconFont :class="`day-night-switch-item ${_value === 'night' ? 'checked' : ''}`" name="icon-moono" />
    </div>
  </ThemeProvider>
</template>
<style scoped lang="less">
  .day-night-switch {
    .spot {
      width: calc(50% - 1px);
      z-index: 1;
      left: 0;
      &.night {
        left: calc(50% + 1px);
        @apply bg-layout;
      }
    }

    &-item {
      @apply z-20 bg-transparent p-xxs rounded-full text-disabled ~"last:ml-[2px]";
      &.checked {
        @apply text-text;
      }
    }
  }
</style>
