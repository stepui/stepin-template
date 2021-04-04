<template>
  <stepin-view
    :menu-list="menuList"
    :tabs-mode="true"
    system-name="Stepin Template"
    :logo-src="logoSrc"
    avatar="https://portrait.gitee.com/uploads/avatars/user/691/2073535_iczer_1578965604.png!avatar200"
    username="iczer"
    :user-menu-list="[
      { title: '个人中心', key: 'personal', icon: 'UserOutlined' },
    ]"
    @user-menu-click="userMenuClick"
    @setting-change="onSettingChange"
    @copy-config="onCopyConfig"
    v-model:show-setting="showSetting"
  >
    <template #headerActions>
      <a
        class="action-item"
        href="https://github.com/stepui/stepin-template"
        target="_balnk"
      >
        <GithubOutlined />
      </a>
      <a
        class="action-item"
        href="https://gitee.com/stepui/stepin-template"
        target="_blank"
      >
        <img class="gitee-logo" :src="giteeLogo" />
      </a>
      <div class="action-item" @click="onSettingClick">
        <SettingOutlined />
      </div>
    </template>
    <template #pageFooter>
      <page-footer />
    </template>
  </stepin-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageFooter from '/@/components/layout/PageFooter.vue';
  import logoSrc from '/@/assets/logo.png';
  import giteeLogo from '/@/assets/gitee.svg';

  export default defineComponent({
    name: 'App',
    components: { PageFooter },
    data() {
      return {
        collapsed: false,
        logoSrc,
        giteeLogo,
        showSetting: false,
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
                },
                children: [
                  {
                    title: '角色管理',
                    path: '/system/permission/role',
                    meta: {
                      icon: 'CommentOutlined',
                      badge: '9',
                    },
                  },
                  {
                    title: '分组管理',
                    path: '/system/permission/group',
                    meta: {
                      icon: 'CommentOutlined',
                    },
                  },
                ],
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
      onSettingChange(category: string, key: string, value: any) {
        console.log(category, key, value);
      },
      onCopyConfig(config: any) {
        console.log(config);
      },
      onSettingClick() {
        this.showSetting = true;
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

<style lang="less" scoped>
  .gitee-logo {
    width: 20px;
  }
  .action-item {
    font-size: 20px;
    height: 100%;
    margin: 0 -8px;
    padding: 0 4px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }
</style>
