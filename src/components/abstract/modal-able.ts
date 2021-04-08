import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalAble',
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    sVisible: {
      set(val: boolean) {
        this.show = val;
        this.$emit('update:visible', val);
      },
      get(): boolean {
        return this.visible ?? this.show;
      },
    },
  },
});
