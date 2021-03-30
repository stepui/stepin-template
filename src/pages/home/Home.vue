<template>
  <tabs />
  <a-divider />
  <s-iframe />
  <a-divider />
  <section>
    <h2>菜单</h2>
    <p>菜单在 vue2 版本基础上，添加了多页签配置支持，增加了徽标功能。</p>
  </section>
  <a-divider />
  <section>
    <h2>设置面板</h2>
    <p>设置面板现可以通过配置的方式自由定制，并可通过 api 控制显示隐藏。</p>
  </section>
  <a-divider />
  <section>
    <h2>主题配置</h2>
    <p>新版框架引入了 tailwindcss 支持;</p>
    <p>
      更多的主题选项可供配置（包括且不限于：主题色、间距、字体、功能色、背景色...）
    </p>
    <p>你也可以通过简单的配置实现你自己的一套主题，主题同样支持实时切换。</p>
  </section>
  <section>
    <h2>异步路由（动态路由/菜单）</h2>
    <p>简化了异步路由配置规则，支持更自由灵活的配置方式;</p>
  </section>
  <section>
    <h2>国际化</h2>
    <p>有别于vue2版本内部绑定的方式，国际化功能以插件的方式提供，与框架解耦;</p>
  </section>
  <section>
    <h2>权限控制</h2>
    <p>权限控制功能以插件的方式提供，在重新设计中...</p>
  </section>
  <section>
    <h2>关于 Stepin</h2>
    <p>
      Stepin 是一套面向后端管理系统的高级组件库和插件库（基于 ant-design-vue）。
    </p>
    <p>
      vue3 版本框架的所有功能均会以组件或插件的方式发布在 stepin
      组件库中，可通过 npm、yarn进行升级、更新。
    </p>
  </section>
  <section>
    <h2>其它</h2>
    <p>
      如果你有其它任何想要的功能，不妨给我们提
      issue，我们会认真考虑每个用户的需求。
    </p>
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SIframe from './SIframe.vue';
  import Tabs from './Tabs.vue';

  export default defineComponent({
    components: { Tabs, SIframe },
    name: 'Home',
    data() {
      return {};
    },
  });
</script>
<style lang="less" scoped>
  section {
    @apply mt-4 bg-gray-100 p-4 rounded;
  }
</style>
