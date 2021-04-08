<template>
  <a-modal
    width="460px"
    v-model:visible="sVisible"
    wrap-class-name="login-modal"
    :closable="false"
    :footer="null"
    :body-style="{ padding: 0 }"
  >
    <login-box @login="(values) => $emit('login', values)" :loading="loading" />
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import LoginBox from './LoginBox.vue';
  import { ModalAble } from '/@/components/abstract';

  export default defineComponent({
    name: 'LoginModal',
    extends: ModalAble,
    components: { LoginBox },
    emits: ['login'],
    props: {
      loading: Boolean,
    },
  });
</script>
<style lang="less">
  .login-modal .ant-modal-content {
    @apply bg-transparent;
  }
</style>
