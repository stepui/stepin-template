<template>
  <div class="common-view">
    <div class="common-header">
      <div class="common-header-main">
        <div class="logo">
          <img class="img" src="@/assets/vite.svg" />
        </div>
        <div class="navigation">
          <div class="nav-item">
            <stepin-link to="/login"> 文档 </stepin-link>
          </div>
          <div class="nav-item">
            <stepin-link to="/login"> API </stepin-link>
          </div>
          <div class="nav-item">
            <stepin-link to="/login"> 关于 </stepin-link>
          </div>
          <div class="nav-item">
            <stepin-link to="/login"> 商业合作 </stepin-link>
          </div>
        </div>
        <div class="actions">
          <a-button class="login-btn" type="primary">注册</a-button>
        </div>
      </div>
    </div>
    <div class="common-content">
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="less">
  .common-view {
    display: grid;
    min-height: 100vh;
    grid-template-rows: 64px 1fr;
    @apply bg-gray-800;
    .common-header {
      @apply bg-gray-800 flex items-center pt-lg;
      &-main {
        width: 1400px;
        margin: 0 auto;
        @apply flex items-center;
        .logo {
          flex: none;
          .img {
            height: 36px;
          }
        }
        .navigation {
          flex: 1;
          display: flex;
          align-items: center;
          .nav-item {
            font-size: 18px;
            margin-left: 64px;
            .stepin-link {
              color: theme('colors.text-inverse');
              &:hover {
                color: theme('colors.primary.500');
              }
            }
          }
        }
        .actions {
          flex: none;
          .login-btn {
            height: 38px;
            width: 88px;
            font-size: 16px;
            @apply bg-gray-700 border-gray-600 rounded-md hover:bg-gray-600;
          }
        }
      }
    }
    .common-content {
      .main {
        width: 1400px;
        margin: 0 auto;
      }
    }
  }
</style>
