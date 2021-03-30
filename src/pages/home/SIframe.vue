<template>
  <div class="iframe">
    <section>
      <h2>Iframe 支持</h2>
      <p>
        现在，stepin 组件库提供了 IframeBox 组件。<br />在你的路由配置，设置
        {..., meta: {href: 'https://www.baidu.com'}, component: () =>
        import('stepin/es/iframe-box')} 即可在 Stepin 项目中打开 iframe
        页面。<br />
        同样，iframe 也支持 新窗口、多页签、指定布局模式。
      </p>
      <div class="container">
        <stepin-link class="link" to="/iframe/baidu">百度</stepin-link>
        <stepin-link class="link" to="/iframe/baidu" target="_blank">
          百度（新窗口）
        </stepin-link>
        <stepin-link
          class="link"
          :to="{ path: '/iframe/baidu', query: { _to_view: 'blank' } }"
          target="_blank"
        >
          百度（新窗口-不带后台布局）
        </stepin-link>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SIframe',
    data() {
      return {};
    },
  });
</script>
<style lang="less" scoped>
  section {
    @apply p-4 bg-gray-100 rounded;
  }
  .container {
    @apply p-8 bg-green-100 rounded;
  }
  .link {
    @apply block;
  }
</style>
