import { watch, computed, ref } from 'vue';

function useModelValue<T>(value: () => T | undefined, onChange: (val?: T) => void, defaultValue?: T) {
  const _value = ref<T>();
  _value.value = value() ?? defaultValue;
  const sValue = computed({
    get() {
      return value() ?? _value.value;
    },
    set(val: T | undefined) {
      _value.value = val;
      onChange(val);
    },
  });
  watch(value, () => {
    _value.value = value();
  });
  return { value: sValue };
}

export default useModelValue;
