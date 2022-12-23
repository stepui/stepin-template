<template>
  <div class="async-route">
    <a-button @click="loadRoutes">加载路由</a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { addRoutes } from '@/router/dynamicRoutes';

  export default defineComponent({
    name: 'AsyncRoute',
    data() {
      return {};
    },
    methods: {
      loadRoutes() {
        // userService.getRoutes().then((res) => {
        //   const { code, data: routes } = res;
        //   if (code === 0) {
        //     addRoutes(routes);
        //     this.$message.success('路由加载成功');
        //   }
        // });
      },
    },
  });
</script>
