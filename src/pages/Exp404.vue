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

  if (props.loading) {
    if (!_loading.value) {
      router.push(route.fullPath);
    } else {
      watch(_loading, () => {
        router.push(route.fullPath);
      });
    }
    configPage(route, { title: 'loading' });
    configPage(route, { title: undefined });
  }
</script>
<style scoped>
  .loading {
    min-height: calc(100vh - theme(height.header) - 182px);
  }
</style>
