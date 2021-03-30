<template>
  <div>Workplace</div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Workplace',
    data() {
      return {};
    },
    methods: {
      login() {
        this.$router.push({
          path: '/login',
          query: { _to_view: 'admin' },
        });
      },
    },
  });
</script>
