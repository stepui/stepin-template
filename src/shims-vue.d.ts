import { DefineComponent } from 'vue';
import { Router } from 'vue-router';
import { MessageApi } from 'ant-design-vue/es/message';
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
    $message: MessageApi;
  }
}
