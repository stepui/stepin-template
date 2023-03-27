<script lang="ts" setup>
  import { PropType, watch } from 'vue';
  import useModelValue from '@/utils/useModelValue';
  import { configTheme } from '@/theme';
  import { useSettingStore, storeToRefs } from '@/store';

  export type ValueType = 'day' | 'night';

  const props = defineProps({
    value: { type: String as PropType<ValueType> },
  });

  const emit = defineEmits<{
    (e: 'update:value', value: ValueType): void;
  }>();

  const { value: _value } = useModelValue(
    () => props.value,
    (val) => emit('update:value', val),
    'day'
  );
  const valeToggle: { [key in ValueType]: ValueType } = {
    day: 'night',
    night: 'day',
  };

  function toggle() {
    _value.value = valeToggle[_value.value];
  }

  const settingStore = useSettingStore();
  const { theme } = storeToRefs(settingStore);
  const { setTheme } = settingStore;

  let cachedTheme = theme.value;
  watch(theme, (val) => {
    if (val !== 'night') {
      cachedTheme = val;
      _value.value = 'day';
    }
  });

  watch(_value, (val) => {
    if (val === 'day') {
      setTheme(cachedTheme);
      configTheme(cachedTheme);
    } else {
      setTheme('night');
      configTheme('night');
    }
  });
</script>
<template>
  <div
    @click="toggle"
    class="bg-fill-2 day-night-switch hover:border-border relative border-border-2 text-lg rounded-full border border-solid flex items-center"
  >
    <div :class="`spot transition-[left] duration-300 h-full absolute rounded-full bg-container ${_value}`"></div>
    <IconFont :class="`day-night-switch-item ${_value === 'day' ? 'checked' : ''}`" name="icon-sun" />
    <IconFont :class="`day-night-switch-item ${_value === 'night' ? 'checked' : ''}`" name="icon-moono" />
  </div>
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
