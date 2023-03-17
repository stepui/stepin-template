<script lang="ts" setup>
  import { computed, nextTick, PropType, ref, toRefs } from 'vue';

  export type AntInputType =
    | 'input'
    | 'textarea'
    | 'radio'
    | 'timePicker'
    | 'datePicker'
    | 'rangePicker'
    | 'select'
    | 'mention'
    | 'rate'
    | 'upload'
    | 'treeSelect'
    | 'transfer'
    | 'checkbox'
    | 'cascader'
    | 'autoComplete'
    | 'inputNumber'
    | 'slider'
    | 'switch';

  const emit = defineEmits<{
    (e: 'update:edit', edit: boolean): void;
    (e: 'update:value', value: any): void;
    (e: 'pressEnter', event: KeyboardEvent): void;
  }>();
  const props = defineProps({
    value: [String, Number, Boolean, Object],
    edit: {
      type: Boolean,
      default: null,
    },
    editOnClick: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as PropType<AntInputType>,
      default: 'input',
      validator(val: string) {
        return [
          'input',
          'radio',
          'timePicker',
          'datePicker',
          'rangePicker',
          'select',
          'mention',
          'rate',
          'upload',
          'treeSelect',
          'transfer',
          'checkbox',
          'cascader',
          'autoComplete',
          'inputNumber',
          'slider',
          'switch',
          'textarea',
        ].includes(val);
      },
    },
    options: Object,
  });

  const { type } = toRefs(props);

  const component = computed(() => {
    const _type = type.value;
    return 'A' + _type.substring(0, 1).toUpperCase() + _type.substring(1);
  });

  const cacheEdit = ref(false);

  const _edit = computed({
    get() {
      if (props.edit !== null) {
        cacheEdit.value = props.edit;
      }
      return props.edit ?? cacheEdit.value;
    },
    set(val) {
      cacheEdit.value = val;
      emit('update:edit', val);
    },
  });

  const input = ref();

  function editCell() {
    if (props.editOnClick) {
      _edit.value = true;
      nextTick(() => input.value?.focus());
    }
  }

  function complete() {
    _edit.value = false;
  }

  const cacheVal: any = ref(null);
  const _value = computed({
    get() {
      if (props.value !== undefined) {
        cacheVal.value = props.value;
      }
      return props.value ?? cacheVal.value;
    },
    set(val) {
      cacheVal.value = val;
      emit('update:value', val);
    },
  });
</script>
<template>
  <slot v-if="_edit" class="editable-cell-input" name="input">
    <component
      ref="input"
      @keyup.enter="complete"
      @blur="complete"
      v-model:value="_value"
      class="editable-cell-input-component"
      v-bind="options"
      :is="component"
    />
  </slot>
  <div v-else @click="editCell" class="editable-cell-show">
    <slot>
      {{ value }}
    </slot>
  </div>
</template>
<style lang="less" scoped>
  .editable-cell {
    &-input {
      &-component {
      }
    }
  }
</style>
