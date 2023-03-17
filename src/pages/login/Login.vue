<template>
  <div class="login">
    <div class="login-main">
      <div class="introduction">
        <a-typography-title class="title"> Build your application with </a-typography-title>
        <a-typography-title class="sub-title" type="success"> Stepin Library </a-typography-title>
        <a-typography class="description">
          使用 <a-typography-text type="success">Stepin</a-typography-text> +
          <a-typography-text type="success">Vue</a-typography-text>
          创建 Web 应用非常简单：通过 Vue.js，我们已经用组件组成了我们的应用。当加入 Stepin
          时，我们需要做的就是将我们的组件映射到路由上，让 Stepin 知道在哪里渲染它们。马上使用 Stepin
          创建你的第一个应用吧。
        </a-typography>
        <a-typography-title type="warning" :level="2"> Features: </a-typography-title>
        <div class="feature-list">
          <div class="item"><CoffeeOutlined class="icon" />快速</div>
          <div class="item"><CrownOutlined class="icon" />优雅</div>
          <div class="item"><LikeOutlined class="icon" />自然</div>
        </div>
      </div>
      <div class="login-container">
        <login-box @success="onLoginSuccess" />
      </div>
    </div>
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
    @apply flex items-center h-full;
    margin: 0 auto;
    .login-main {
      @apply flex w-full justify-between items-center;
      padding: 48px 0 0;
      height: 800px;
      .introduction {
        width: 800px;
        .title,
        .sub-title {
          font-size: 56px;
          margin-top: 0;
          margin-bottom: 0;
        }
        .title {
          @apply text-text-inverse;
        }
        .description {
          @apply text-text-inverse mt-lg;
          font-size: 22px;
        }
        .feature-list {
          @apply flex mt-8;
          .item {
            @apply text-gray-300;
            font-size: 20px;
            &:not(:first-child) {
              margin-left: 64px;
            }
            .icon {
              @apply text-gray-600;
              margin-right: 12px;
            }
          }
        }
      }
      .login-container {
      }
    }
  }
</style>
