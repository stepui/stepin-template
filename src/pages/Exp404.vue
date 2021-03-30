<template>
  <div>
    <div>404 Not Found</div>
    <div>path: {{ $route.path }}</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Exp404',
    data() {
      return {};
    },
  });
</script>
