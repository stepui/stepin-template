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
} from 'ant-design-vue';
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
  }
}
export {};
