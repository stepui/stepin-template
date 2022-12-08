<script lang="ts" setup>
  import IconSelector, { IconSelectGroup, IconSelectOption } from '@/components/selector/IconSelector.vue';
  // @ts-ignore
  import * as icons from '@ant-design/icons-vue/es/icons';
  import { reactive, ref } from 'vue';

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
      auth: 'system',
    },
    {
      name: '工作台',
      icon: 'SettingOutlined',
      component: '@/pages/workplace',
      path: '/workplace',
      auth: 'system',
    },
    {
      name: '工作台',
      icon: 'SettingOutlined',
      component: '@/pages/workplace',
      path: '/workplace',
      auth: 'system',
    },
    {
      name: '系统管理',
      icon: 'SettingOutlined',
      component: '@/pages/system',
      path: '/system',
      auth: 'system',
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

  const showForm = ref(false);

  const formData = reactive({
    title: '菜单标题',
    icon: 'AccountBookTwoTone',
    path: undefined,
    component: undefined,
    visible: true,
    parent: undefined,
  });
</script>
<template>
  <div class="authority">
    <a-table :columns="columns" :dataSource="menuList" :pagination="{ pageSize: 10, current: 1, total: 10 }">
      <template #title>
        <div class="flex justify-between">
          菜单列表
          <div class="flex">
            <a-button type="primary" @click="showForm = true">
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
          <a-button class="text-xs" type="primary" size="small">编辑</a-button>
        </template>
      </template>
    </a-table>
    <a-modal width="480px" v-model:visible="showForm" title="新增菜单">
      <a-form :model="formData" :labelCol="{ span: 4 }" :wrapperCol="{ span: 18, offset: 1 }">
        <a-form-item name="parent" label="父级菜单">
          <a-input v-model:value="formData.parent" />
        </a-form-item>
        <a-form-item name="title" label="菜单标题">
          <a-input v-model:value="formData.title" />
        </a-form-item>
        <a-form-item name="icon" label="图标">
          <IconSelector :column="6" :options="groupList" mode="single" v-model:value="formData.icon" />
        </a-form-item>
        <a-form-item name="icon" label="path">
          <a-input v-model:value="formData.path" />
        </a-form-item>
        <a-form-item name="component" label="页面组件">
          <a-input v-model:value="formData.path" />
        </a-form-item>
        <a-form-item name="visible" label="是否可见">
          <a-input v-model:value="formData.visible" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
