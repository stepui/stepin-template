<template>
  <div class="tabs">
    <section>
      <h2>多页签视图</h2>
      <p>
        多页签开启方式更灵活，你可以随意的为任意页面开启页签视图（区别于vue2版本，现在无需在路由配置视图布局）；
      </p>
      <p>同个页面现在可以开启多个页签（vue2 版同个路由只能打开一个页签）；</p>
      <p>
        缓存，和 vue2
        版本一样，你可以为每一个页面单独配置缓存设置，或者全局控制缓；
      </p>
      <div class="container">
        <div class="left">
          <h3>链接方式</h3>
          <stepin-link :to="'/login'"> 登录页 </stepin-link>
          <stepin-link :to="'/login'" target="_blank">
            登录页（新窗口）
          </stepin-link>
          <stepin-link
            :to="{ path: '/login', query: { _to_view: 'blank' } }"
            target="_blank"
          >
            登录页（新窗口-不带后台布局）
          </stepin-link>
        </div>
        <div class="right">
          <h3>函数调用</h3>
          <a-button type="primary" @click="login">登录页</a-button>
          <br />
          <a-button @click="login(undefined, '_blank')">
            登录页 （新窗口）
          </a-button>
          <br />
          <a-button type="danger" @click="login('blank', '_blank')"
            >登录页 （新窗口-不带后台布局）
          </a-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Tabs',
    data() {
      return {};
    },
    methods: {
      login(view?: string, target?: string) {
        // @ts-ignore
        this.$openPage('/login', { view, target });
      },
    },
  });
</script>
<style lang="less" scoped>
  section {
    @apply p-4 bg-bg-disabled rounded;
  }
  .container {
    @apply flex mt-4 mb-4 bg-warning-50 p-8 rounded;
    .left,
    .right {
      @apply flex-1;
      a {
        @apply mt-5 block;
      }
      button {
        @apply mt-2;
      }
    }
  }
</style>
