<template>
  <stepin-view
    :menu-list="menuList"
    theme="dark"
    mode="side"
    :tabs-mode="true"
    system-name="Stepin Template"
    logo-src="/@/assets/logo.png"
    avatar="https://portrait.gitee.com/uploads/avatars/user/691/2073535_iczer_1578965604.png!avatar200"
    username="iczer"
    :user-menu-list="[
      { title: '个人中心', key: 'personal', icon: 'UserOutlined' },
    ]"
    @user-menu-click="userMenuClick"
    @setting-change="onSettingChange"
    @copy-config="onCopyConfig"
  >
    <template #pageFooter>
      <page-footer />
    </template>
  </stepin-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageFooter from '/@/components/layout/PageFooter.vue';

  export default defineComponent({
    name: 'App',
    components: { PageFooter },
    data() {
      return {
        collapsed: false,
        menuList: [
          {
            title: '首页',
            path: '/',
            meta: {
              badge: 'new',
              icon: 'HomeOutlined',
            },
          },
          {
            title: '工作台',
            path: '/workplace',
            meta: {
              icon: 'AimOutlined',
            },
          },
          {
            title: '系统管理',
            path: '/system',
            meta: {
              icon: 'CompassOutlined',
            },
            children: [
              {
                title: '权限管理',
                path: '/system/permission',
                meta: {
                  icon: 'CommentOutlined',
                  badge: '9',
                },
              },
            ],
          },
          {
            title: '百度',
            path: '/iframe/baidu',
            meta: {
              badge: 'dot',
              icon: 'ControlOutlined',
            },
          },
          {
            title: 'b站',
            path: '/iframe/bilibili',
            meta: {
              target: '_blank',
              href: 'https://www.bilibili.com',
              view: 'blank',
              icon: 'ControlOutlined',
            },
          },
        ],
      };
    },
    methods: {
      userMenuClick(key: string) {
        console.log(key, 'user-menu-click');
      },
      onSettingChange(...params: any) {
        console.log(params);
      },
      onCopyConfig(config: any) {
        console.log(config);
      },
    },
  });
</script>

<style lang="less">
  html {
    height: 100vh;
    overflow-y: hidden;
  }
  body {
    margin: 0;
    height: 100vh;
    overflow-y: hidden;
  }
</style>

<style lang="less" scoped></style>
