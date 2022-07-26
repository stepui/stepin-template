<template>
  <div v-if="parts" class="splitter">
    <template v-for="(part, i) in parts" :key="i">
      <span class="splitter-part">{{ part }}</span>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'Splitter',
    props: {
      value: String,
      partLength: { type: Number, default: 4 },
      sensitive: Array as PropType<number[]>,
    },
    setup(props, { attrs, slots, emit }) {},
    computed: {
      parts(): string[] {
        let { value = '', partLength, sensitive = [] } = this;
        const [start = -1, end = -1] = sensitive;
        let sense = '';
        for (let i = 0; i < end - start; i++) {
          sense += '*';
        }
        value = `${value.substring(0, start)}${sense}${value.substring(
          end,
          value.length
        )}`;

        const parts = [];
        for (let i = 0; i < value.length; i += partLength) {
          parts.push(value.substring(i, i + partLength));
        }
        return parts;
      },
    },
  });
</script>
<style lang="less" scoped>
  .splitter {
    &-part {
      &:not(:first-child) {
        @apply ml-2;
      }
    }
  }
</style>
