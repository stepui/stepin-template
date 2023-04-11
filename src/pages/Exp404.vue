<template>
  <div v-if="!loading">
    <div>404 Not Found</div>
    <div>path: {{ $route.path }}</div>
  </div>
  <div v-else class="loading flex items-center">
    <div class="loader relative">
      <span class="absolute -bottom-12 text-primary-500">loading...</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { configPage } from 'stepin/es/tabs-view';
  import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

  const props = defineProps({
    loading: Boolean,
  });
  const route = useRoute();

  if (props.loading) {
    configPage(route, { title: 'loading' });

    onBeforeRouteUpdate(() => {
      configPage(route, { title: undefined });
    });
    onBeforeRouteLeave(() => {
      configPage(route, { title: undefined });
    });
  }
</script>
<style scoped>
  .loading {
    min-height: calc(100vh - theme(height.header) - 182px);
  }
  .loader {
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
  }

  .loader:before {
    content: '';
    width: 48px;
    height: 5px;
    background: var(--color-primary-6);
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
  }

  .loader:after {
    content: '';
    width: 100%;
    height: 100%;
    background: var(--color-primary-4);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
  }

  @keyframes jump7456 {
    15% {
      border-bottom-right-radius: 3px;
    }

    25% {
      transform: translateY(9px) rotate(22.5deg);
    }

    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }

    75% {
      transform: translateY(9px) rotate(67.5deg);
    }

    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow324 {
    0%,
    100% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.2, 1);
    }
  }
</style>
