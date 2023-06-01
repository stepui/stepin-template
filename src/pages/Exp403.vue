<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  defineProps({
    permission: String,
    path: String,
  });
  console.log(useRoute());
</script>
<template>
  <div>
    <div>403 Forbidden (no permission)</div>
    <div>path: {{ path }}</div>
    <div>
      need permission: <a-tag color="blue">{{ permission }}</a-tag>
    </div>
  </div>
</template>
