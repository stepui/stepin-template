<template>
  <div class="page-footer">
    <div class="links">
      <a class="link">Admin 首页</a>
      <a class="link">
        <GithubOutlined />
      </a>
      <a class="link">Ant Design</a>
    </div>
    <div class="copyright">
      Copyright <CopyrightOutlined class="icon-copyright" /> 2020 ICZER
      工作室出品
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PageFooter',
    data() {
      return {};
    },
  });
</script>
<style scoped lang="less">
  .page-footer {
    text-align: center;
    @apply text-gray-400;
    .links {
      display: flex;
      justify-content: center;
      .link {
        @apply text-gray-400 pl-4 pr-4 hover:text-primary-600;
      }
    }
    .copyright {
      margin-top: 8px;
      .icon-copyright {
        margin: 0;
      }
    }
  }
</style>
