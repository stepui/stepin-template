import { AlertApi } from 'stepin/es/alert-message';
import { MessageApi } from 'ant-design-vue/es/message';

import IconFont from '@/plugins/iconfont/IconFont.vue';
declare module 'vue' {
  export interface ComponentCustomProperties {
    $message: MessageApi;
    $alert: AlertApi;
  }
}
declare module 'vue-router' {
  interface RouteMeta {
    cacheable?: boolean;
    closeable?: boolean;
    icon?: DefineComponent | FunctionalComponent | string;
    badge?: string | number | boolean;
    href?: string;
    target?: '_blank' | '_self';
    permission?: string;
    title?: string;
    renderMenu?: boolean;
    _cache?: RouteMeta;
    view?: string;
    _is404Page?: boolean;
  }
}

export {};
