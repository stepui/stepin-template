import { watch, computed, ref, onBeforeMount } from 'vue';

function useModelValue<T>(value: () => T | undefined, onChange: (val?: T) => void) {
  const _value = ref<T>();
  const sValue = computed({
    get() {
      return value() ?? _value.value;
    },
    set(val: T | undefined) {
      _value.value = val;
      onChange(val);
    },
  });
  onBeforeMount(() => {
    _value.value = value();
  });
  watch(value, () => {
    _value.value = value();
  });
  return { value: sValue };
}

export default useModelValue;
