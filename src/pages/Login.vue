<template>
  <div class="login">
    <a-form class="login-form" :labelCol="{ span: 6 }">
      <a-form-item label="用户名">
        <a-input />
      </a-form-item>
      <a-form-item label="密码">
        <a-input type="password" />
      </a-form-item>
      <a-button> 登录 </a-button>
    </a-form>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Login',
    data() {
      return {};
    },
  });
</script>
<style scoped lang="less">
  .login {
    height: 1200px;
  }
  .login-form {
    width: 300px;
    margin: auto;
    text-align: center;
  }
</style>
