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
  import { useRoute } from 'vue-router';

  const props = defineProps({
    loading: Boolean,
  });
  const route = useRoute();

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
