<template>
  <div v-if="loading == 'true'" class="loading flex items-center justify-center">
    <ReadingLoader />
  </div>
  <div v-else>
    <div>403 Forbidden (no permission)</div>
    <div>path: {{ path }}</div>
    <div>
      need permission: <a-tag color="blue">{{ permission }}</a-tag>
    </div>
    <a-button @click="updatePermission">更新权限</a-button>
  </div>
</template>
<script lang="ts" setup>
  import ReadingLoader from '@/components/loaders/ReadingLoader.vue';
  import { configPage, closePage } from 'stepin/es/tabs-view';
  import { useRoute } from 'vue-router';
  import { useLoadingStore, storeToRefs } from '@/store';
  import { watch } from 'vue';
  import { useAuthStore } from '@/plugins';

  const props = defineProps({
    loading: String,
    permission: String,
    path: String,
  });
  const route = useRoute();

  const { authLoading } = storeToRefs(useLoadingStore());

  const authStore = useAuthStore();
  function updatePermission() {
    authStore.setAuthorities(['edit1']);
  }

  if (props.loading) {
    if (!authLoading.value) {
      closePage(route, props.path);
    } else {
      watch(authLoading, () => {
        closePage(route, props.path);
      });
    }
  }
  if (authLoading.value) {
    configPage(route, { title: 'loading' });
    configPage(route, { title: undefined });
  }
</script>
<style scoped>
  .loading {
    min-height: calc(100vh - theme(height.header) - 182px);
  }
</style>
