import {
  DropdownProps,
  PaginationProps,
  ButtonProps,
  ConfigProviderProps,
  TabsProps,
  SelectProps,
  FormProps,
  FormItemProps,
  ModalProps,
  paginationProps,
  SwitchProps,
  CascaderProps,
  InputProps,
  SpinProps,
} from 'ant-design-vue';
import { MessageApi } from 'ant-design-vue/es/message';

import IconFont from '@/plugins/iconfont/IconFont.vue';
declare module 'vue' {
  export interface GlobalComponents {
    ADropdown: DropdownProps;
    APagination: PaginationProps;
    AButton: ButtonProps;
    AConfigProvider: ConfigProviderProps;
    ATabs: TabsProps;
    IconFont: typeof IconFont;
    ASelect: SelectProps;
    AForm: FormProps;
    AFormItem: FormItemProps;
    AModal: ModalProps;
    APagination: paginationProps;
    ASwitch: SwitchProps;
    ACascader: CascaderProps;
    AInput: InputProps;
    ASpin: SpinProps;
  }

  export interface ComponentCustomProperties {
    $message: MessageApi;
  }
}
export {};
