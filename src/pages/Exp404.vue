<template>
  <div v-if="!loading">
    <div>404 Not Found</div>
    <div>path: {{ $route.path }}</div>
  </div>
  <div v-else class="loading flex items-center justify-center">
    <ReadingLoader />
  </div>
</template>
<script lang="ts" setup>
  import ReadingLoader from '@/components/loaders/ReadingLoader.vue';
  import { configPage } from 'stepin/es/tabs-view';
  import { useRoute, useRouter } from 'vue-router';
  import { useMenuStore, storeToRefs } from '@/store';
  import { watch } from 'vue';

  const props = defineProps({
    loading: Boolean,
  });
  const route = useRoute();

  const { loading: _loading } = storeToRefs(useMenuStore());

  const router = useRouter();

  // fix: 修复浏览器刷新时，页面加载动画不结束问题；(暂不知道为啥这段代码能起作用)
  watch(_loading, () => {
    router.push(route.fullPath);
  });

  if (props.loading) {
    configPage(route, { title: 'loading' });
    configPage(route, { title: undefined });
  }
</script>
<style scoped>
  .loading {
    min-height: calc(100vh - theme(height.header) - 182px);
  }
</style>
