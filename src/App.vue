<script lang="ts" setup>
  import AsyncApp from './AsyncApp.vue';
</script>
<template>
  <Suspense>
    <template #default>
      <AsyncApp />
    </template>
    <template #fallback> 加载中... </template>
  </Suspense>
</template>
