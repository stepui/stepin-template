<template>
  <div class="async-route">
    <a-button @click="loadRoutes">加载路由</a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import RouterUtil from 'stepin/es/utils/router';
  import { userService } from '@/services';
  import componentMap from '@/router/component.map';

  export default defineComponent({
    name: 'AsyncRoute',
    data() {
      return {};
    },
    methods: {
      loadRoutes() {
        userService.getRoutes().then((res) => {
          const { message, code, data } = res;
          if (code === 0) {
            RouterUtil.loadRoutes(data, this.$router, componentMap);
            this.$message.success('路由加载成功');
          }
        });
      },
    },
  });
</script>
