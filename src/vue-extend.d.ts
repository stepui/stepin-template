import { MessageApi } from 'ant-design-vue/es/message';

declare module 'vue' {
  interface ComponentCustomProperties {
    $message: MessageApi;
  }
}
