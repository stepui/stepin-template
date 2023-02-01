<script lang="ts" setup>
  import IconSelector, { IconSelectGroup, IconSelectOption } from '@/components/selector/IconSelector.vue';
  // @ts-ignore
  import * as icons from '@ant-design/icons-vue/es/icons';
  import { reactive, ref, watch, computed, onMounted } from 'vue';
  import { RouteRecordRaw, useRouter } from 'vue-router';
  import { FormInstance } from 'ant-design-vue';
  import { addRoutes } from '@/router/dynamicRoutes';
  import { useMenuStore } from '@/store/menu';

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
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '页面组件',
      dataIndex: 'component',
    },

    {
      title: 'path',
      dataIndex: 'path',
    },
    {
      title: '权限',
      dataIndex: 'auth',
    },
    {
      width: 80,
      title: '操作',
      dataIndex: 'operation',
    },
  ];

  const menuList = reactive([
    {
      name: '工作台',
      icon: 'SettingOutlined',
      component: '@/pages/workplace',
      path: '/workplace',
      permission: 'system',
    },
    {
      name: '工作台',
      icon: 'SettingOutlined',
      component: '@/pages/workplace',
      path: '/workplace',
      permission: 'system',
    },
    {
      name: '工作台',
      icon: 'SettingOutlined',
      component: '@/pages/workplace',
      path: '/workplace',
      permission: 'system',
    },
    {
      name: '系统管理',
      icon: 'SettingOutlined',
      component: '@/pages/system',
      path: '/system',
      permission: 'system',
      children: [
        {
          name: '菜单管理',
          icon: 'SettingOutlined',
          component: '@/pages/system/menu',
          path: 'menu',
          auth: 'system:menu',
        },
      ],
    },
  ]);

  type MenuData = {
    name?: string;
    icon?: string;
    component?: string;
    path?: string;
    permission?: string | number;
    visible?: boolean;
    parent?: string[];
  };

  const toMenuData = (routes: readonly RouteRecordRaw[]): MenuData[] => {
    return routes.map((route) => {
      return {
        name: route.name as string,
        icon: route?.meta?.icon as string,
        component: route.component?.toString(),
        path: route.path,
        permission: route.meta?.permission as string,
        children: route.children && toMenuData(route.children),
      };
    });
  };
  const router = useRouter();
  const _menuList = computed(() => {
    return toMenuData(router.options.routes);
  });

  const menu = [
    {
      label: '个人中心',
      value: 'personal',
      children: [
        { label: '我的资料', value: 'personal/profile' },
        { label: '安全设置', value: 'personal/safe' },
      ],
    },
    {
      label: '系统配置',
      value: 'system',
      children: [
        {
          label: '权限管理',
          value: 'system/permission',
        },
        {
          label: '用户管理',
          value: 'system/user',
        },
        {
          label: '菜单管理',
          value: 'system/menu',
          children: [
            {
              label: '权限管理',
              value: 'system/menu/permission',
            },
          ],
        },
      ],
    },
  ];

  const showForm = ref(false);

  const formData = reactive<MenuData>({
    name: undefined,
    icon: undefined,
    path: undefined as never,
    component: undefined,
    visible: true,
    parent: [],
    permission: undefined,
  });

  const editPath = false;
  const pathInput = ref();

  watch(
    () => formData.parent,
    () => {
      if (editPath === false) {
        formData.path = formData.parent && formData.parent.slice(-1)[0] + '/';
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
      .then((res) => {
        addRoutes([
          {
            path: res.path,
            name: res.name,
            component: res.component,
            meta: {
              icon: res.icon,
              renderMenu: res.visible ?? true,
              permission: res.permission,
            },
          },
        ]);
        showForm.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function edit(record: MenuData) {
    formData.name = record.name;
    formData.path = record.path;
    formData.component = record.component;
    formData.icon = record.icon;
    formData.visible = record.visible;
    formData.permission = record.permission;
    showForm.value = true;
  }

  function add() {
    formData.name = undefined;
    formData.path = undefined;
    formData.component = undefined;
    formData.icon = undefined;
    formData.visible = false;
    formData.permission = undefined;
    showForm.value = true;
  }

  const { getMenuList } = useMenuStore();
  onMounted(() => {
    getMenuList();
  });
</script>
<template>
  <div class="authority">
    <a-table :columns="columns" :dataSource="_menuList" :pagination="{ pageSize: 20, current: 1, total: 10 }">
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
        </template>
      </template>
    </a-table>
    <a-modal :okButtonProps="{ loading }" width="480px" v-model:visible="showForm" title="新增菜单" @ok="submit">
      <a-form ref="form" :model="formData" :labelCol="{ span: 4 }" :wrapperCol="{ span: 18, offset: 1 }">
        <a-form-item required name="name" label="菜单标题">
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item name="icon" label="图标">
          <IconSelector :column="6" :options="groupList" mode="single" v-model:value="formData.icon" />
        </a-form-item>
        <a-form-item name="parent" label="父级菜单">
          <a-cascader
            changeOnSelect
            expandTrigger="hover"
            placeholder="设置父级菜单"
            :options="menu"
            v-model:value="formData.parent"
            allow-clear
          />
        </a-form-item>
        <a-form-item required name="path" label="path">
          <a-input ref="pathInput" v-model:value="formData.path" />
        </a-form-item>
        <a-form-item required name="component" label="页面组件">
          <a-input v-model:value="formData.component" />
        </a-form-item>
        <a-form-item required name="visible" label="是否可见">
          <a-switch v-model:checked="formData.visible" checked-children="是" un-checked-children="否" />
        </a-form-item>
        <a-form-item name="permission" label="权限校验">
          <a-input v-model:value="formData.permission" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
