<script lang="ts" setup>
  import IconSelector, { IconSelectGroup, IconSelectOption } from '@/components/selector/IconSelector.vue';
  // @ts-ignore
  import * as icons from '@ant-design/icons-vue/es/icons';
  import { reactive, ref, watch, computed, onMounted } from 'vue';
  import { FormInstance, TreeSelectProps } from 'ant-design-vue';
  import { useMenuStore, MenuProps } from '@/store/menu';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/plugins';

  const { useAuth } = useAuthStore();

  const iconList: IconSelectOption[] = [];

  const outlined: IconSelectGroup = {
    title: '线框风',
    key: 'outlined',
    list: [],
  };
  const filled: IconSelectGroup = {
    title: '实底风',
    key: 'filled',
    list: [],
  };
  const twoTone: IconSelectGroup = {
    title: '双色风',
    key: 'twoTone',
    list: [],
  };

  const groupList: IconSelectGroup[] = [outlined, filled, twoTone];

  for (const key in icons) {
    const icon = {
      label: key,
      value: key,
      component: icons[key],
    };

    iconList.push(icon);
    if (key.endsWith('Outlined')) {
      outlined.list.push(icon);
    } else if (key.endsWith('Filled')) {
      filled.list.push(icon);
    } else if (key.endsWith('TwoTone')) {
      twoTone.list.push(icon);
    }
  }

  iconList.splice(100);

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'title',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: 'path',
      dataIndex: 'path',
    },
    {
      title: '页面组件',
      dataIndex: 'component',
    },
    {
      title: '权限',
      dataIndex: 'permission',
    },
    {
      title: '渲染菜单',
      dataIndex: 'renderMenu',
      customRender: (val: boolean) => (val ? '是' : '否'),
    },
    {
      width: 140,
      title: '操作',
      align: 'center',
      dataIndex: 'operation',
    },
  ];

  const treeData = computed(() => {
    const toNode = (list: MenuProps[]): TreeSelectProps['treeData'] => {
      return list.map((item) => ({
        title: item.title!,
        value: item.name! as string,
        children: item.children && toNode(item.children!),
      }));
    };

    return toNode(menuList.value);
  });

  const showForm = ref(false);

  const formData = reactive<MenuProps>({
    id: undefined,
    name: '',
    title: undefined,
    icon: undefined,
    badge: undefined,
    target: '_self',
    path: '',
    component: '',
    renderMenu: true,
    parent: undefined,
    permission: undefined,
    cacheable: true,
  });

  const editPath = false;
  const pathInput = ref();

  watch(
    () => formData.parent,
    (val) => {
      if (!val) {
        return;
      }
      const findMenu = (name: string, list: MenuProps[]): MenuProps | undefined => {
        for (const menu of list) {
          if (menu.name === name) {
            return menu;
          } else if (menu.children) {
            const _menu = findMenu(name, menu.children);
            if (_menu) {
              return _menu;
            }
          }
        }
      };
      if (editPath === false) {
        const _menu = findMenu(val, menuList.value);
        formData.path = _menu!.path + '/' + (formData.name || '');
        pathInput.value?.focus();
      }
    }
  );

  const form = ref<FormInstance>();

  const loading = ref(false);

  function submit() {
    loading.value = true;
    form.value
      ?.validate()
      .then(() => {
        formData.id ? updateMenu(formData) : addMenu(formData);
        showForm.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const title = ref('新增菜单');

  const pageType = ref('component');
  const pageTypeConfig = {
    component: {
      props: 'component',
      placeholder: '请输入需要渲染的页面组件',
    },
    iframe: {
      props: 'link',
      placeholder: '请输入链接地址',
    },
    link: {
      props: 'link',
      placeholder: '请输入链接地址',
    },
  };

  watch(pageType, (val) => {
    if (val === 'component') {
      formData.component = undefined;
      formData.target = '_self';
      formData.link = undefined;
      form.value.clearValidate(['link']);
    } else if (val === 'link') {
      formData.component = 'link';
      formData.target = '_blank';
      form.value.clearValidate(['component']);
    } else if (val === 'iframe') {
      formData.component = 'iframe';
      formData.target = '_self';
      form.value.clearValidate(['component']);
    }
  });

  const edit = useAuth('edit', function (record: MenuProps) {
    form.value?.resetFields();
    formData.id = record.id;
    formData.name = record.name;
    formData.title = record.title;
    formData.path = record.path;
    formData.component = record.component;
    formData.icon = record.icon;
    formData.badge = record.badge;
    formData.link = record.link;
    formData.target = record.target;
    formData.renderMenu = record.renderMenu;
    formData.permission = record.permission;
    formData.parent = record.parent;
    pageType.value =
      formData.component === 'LinkView' ? 'link' : formData.component === 'iframe' ? 'iframe' : 'component';
    showForm.value = true;
    title.value = '编辑菜单';
  });

  function add() {
    form.value?.resetFields();
    formData.id = undefined;
    formData.name = '';
    formData.title = undefined;
    formData.path = '';
    formData.component = '';
    formData.icon = undefined;
    formData.renderMenu = false;
    formData.permission = undefined;
    showForm.value = true;
    title.value = '新增菜单';
  }

  const rules = {
    component: [
      {
        async validator(_rule, value) {
          console.log(_rule, value, '--validator');
        },
        trigger: 'change',
      },
    ],
  };

  const remove = useAuth('delete', function (record: MenuProps) {
    removeMenu(record.id!);
  });

  const menuStore = useMenuStore();

  const { getMenuList, updateMenu, addMenu, removeMenu } = useMenuStore();
  const { menuList } = storeToRefs(menuStore);
  onMounted(() => {
    getMenuList();
  });
</script>
<template>
  <div class="authority">
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="menuList"
      :pagination="{ pageSize: 20, current: 1, total: 10 }"
    >
      <template #title>
        <div class="flex justify-between">
          菜单列表
          <div class="flex">
            <a-button type="primary" @click="add">
              <template #icon>
                <PlusOutlined />
              </template>
              新增
            </a-button>
          </div>
        </div>
      </template>
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button class="text-xs" type="primary" size="small" @click="edit(record)">编辑</a-button>
          <a-popconfirm title="确认删除？" @confirm="remove(record)">
            <a-button class="text-xs ml-base" v-auth:delete danger size="small">删除</a-button>
          </a-popconfirm>
        </template>
        <template v-else-if="column.dataIndex === 'icon'">
          <component :is="record.icon" />
        </template>
      </template>
    </a-table>
    <a-modal :okButtonProps="{ loading }" width="540px" v-model:visible="showForm" :title="title" @ok="submit">
      <a-form ref="form" :model="formData" :labelCol="{ span: 5 }" :wrapperCol="{ span: 16, offset: 1 }">
        <a-form-item required name="name" label="name">
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item required name="path" label="path">
          <a-input ref="pathInput" v-model:value="formData.path" />
        </a-form-item>
        <a-form-item required name="title" label="菜单标题">
          <a-input v-model:value="formData.title" />
        </a-form-item>
        <a-form-item name="parent" label="父级菜单">
          <a-tree-select
            tree-default-expand-all
            placeholder="设置父级菜单"
            v-model:value="formData.parent"
            :treeData="treeData"
          />
        </a-form-item>
        <a-form-item name="icon" label="菜单图标">
          <IconSelector :column="6" :options="groupList" mode="single" v-model:value="formData.icon" />
        </a-form-item>
        <a-form-item required :name="pageTypeConfig[pageType].props" :wrapperCol="{ span: 21, offset: 1 }">
          <!-- <a-input v-model:value="formData.component" /> -->
          <a-input-group compact>
            <a-form-item-rest>
              <a-select v-model:value="pageType" style="width: 106px">
                <a-select-option value="component">页面组件</a-select-option>
                <a-select-option value="iframe">iframe</a-select-option>
                <a-select-option value="link">外链</a-select-option>
              </a-select>
            </a-form-item-rest>
            <a-input
              v-model:value="formData[pageTypeConfig[pageType].props]"
              :placeholder="pageTypeConfig[pageType].placeholder"
              style="width: calc(100% - 106px)"
            />
          </a-input-group>
        </a-form-item>
        <a-form-item name="badge" label="菜单徽标">
          <a-input v-model:value="formData.badge" />
        </a-form-item>
        <a-form-item name="permission" label="权限校验">
          <a-input v-model:value="formData.permission" />
        </a-form-item>
        <a-form-item required name="target" label="打开窗口">
          <a-radio-group :disabled="pageType === 'link' || pageType === 'iframe'" v-model:value="formData.target">
            <a-radio value="_self">当前窗口</a-radio>
            <a-radio value="_blank">新窗口</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item required name="renderMenu" label="渲染菜单">
          <a-switch v-model:checked="formData.renderMenu" checked-children="是" un-checked-children="否" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
