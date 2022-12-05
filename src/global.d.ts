import { DropdownProps, PaginationProps, ButtonProps, ConfigProviderProps, TabsProps } from 'ant-design-vue';
import IconFont from '@/plugins/iconfont/IconFont.vue';
declare module 'vue' {
  export interface GlobalComponents {
    ADropdown: DropdownProps;
    APagination: PaginationProps;
    AButton: ButtonProps;
    AConfigProvider: ConfigProviderProps;
    ATabs: TabsProps;
    IconFont: typeof IconFont;
  }
}
export {};
