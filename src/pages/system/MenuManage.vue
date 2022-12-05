<script lang="ts" setup>
  import IconSelector from '@/components/selector/IconSelector.vue';
  import { reactive, ref } from 'vue';

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
      title: '页面',
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
  });
</script>
<template>
  <div class="authority">
    <a-table :columns="columns" :dataSource="menuList" :pagination="{ pageSize: 10, current: 2, total: 100 }">
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
    <a-modal v-model:visible="showForm" title="新增菜单">
      <a-form :model="formData">
        <a-form-item name="title" label="菜单标题">
          <a-input v-model:value="formData.title" />
        </a-form-item>
        <a-form-item name="icon" label="图标">
          <IconSelector> </IconSelector>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
