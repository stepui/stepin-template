<template>
  <div class="login h-[800px] flex items-center justify-center">
    <login-box class="shadow-lg" @success="onLoginSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import LoginBox from './LoginBox.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  function onLoginSuccess() {
    router.push('/workplace');
  }
</script>
<style scoped lang="less">
  .login {
  }
</style>
