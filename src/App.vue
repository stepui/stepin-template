<template>
  <stepin-config-provider>
    <stepin-view
      system-name="Stepin"
      logo-src="@/assets/logo.png"
      :class="`${theme}`"
      :user="user"
      @user-menu-click="userMenuClick"
      @setting-change="onSettingChange"
      @copy-config="onCopyConfig"
      v-model:show-setting="showSetting"
    >
      <template #headerActions>
        <a-input placeholder="开始搜索...">
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
        <a class="action-item" href="http://github.com/stepui/stepin-template" target="_blank">
          <GithubOutlined />
        </a>
        <a class="action-item" href="http://gitee.com/stepui/stepin-template" target="_blank">
          <img class="gitee-logo" src="@/assets/gitee.svg" />
        </a>
        <div class="action-item setting" @click="onSettingClick">
          <SettingOutlined />
        </div>
        <a-popover placement="bottomRight">
          <div class="action-item notice">
            <BellOutlined />
          </div>
          <template #content>
            <Notice :data-source="noticeList" />
          </template>
        </a-popover>
      </template>
      <template #pageFooter>
        <PageFooter />
      </template>
    </stepin-view>
    <login-modal :unless="['/login']" />
  </stepin-config-provider>
</template>

<script lang="ts" setup>
  import { reactive, ref, toRefs } from 'vue';
  import PageFooter from '@/components/layout/PageFooter.vue';
  import { LoginModal } from '@/pages/login';
  import { useAppStore, useAccountStore, useMenuStore } from '@/store';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import Notice from './components/notice/Notice.vue';

  const showSetting = ref(false);
  const router = useRouter();
  const appStore = useAppStore();
  const { theme } = toRefs(appStore);

  useMenuStore().getMenuList();

  const user = reactive({
    name: 'iczer',
    avatar: 'http://portrait.gitee.com/uploads/avatars/user/691/2073535_iczer_1578965604.png!avatar30',
    menuList: [
      { title: '个人中心', key: 'personal', icon: 'UserOutlined' },
      { title: '设置', key: 'setting', icon: 'SettingOutlined' },
      { type: 'divider' },
      { title: '退出登录', key: 'logout', icon: 'LogoutOutlined' },
    ],
  });

  const noticeList = reactive([
    {
      title: '消息',
      list: [
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          img: 'src/assets/avatar/face-1.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'src/assets/avatar/face-2.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'src/assets/avatar/face-3.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'src/assets/avatar/face-4.jpg',
          time: 0,
        },
      ],
    },
    {
      title: '动态',
      list: [
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
      ],
    },
    {
      title: '通知',
      list: [
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
        {
          title: '影佑',
          content: 'xxxxxxxxxxxxxxxxxx',
          img: 'http://i2.hdslb.com/bfs/face/80b6731ccf865ca7a4ac17e6e8848fd0e34c1b91.jpg',
          time: 0,
        },
      ],
    },
  ]);

  function userMenuClick(key: string) {
    switch (key) {
      case 'setting':
        showSetting.value = true;
        break;
      case 'logout':
        useAccountStore()
          .logout()
          .then(() => router.push('/login'));
        break;
      default:
        console.log(key, 'user-menu-click');
    }
  }
  function onSettingChange(category: string, key: string, value: any) {
    console.log(category, key, value);
  }

  function onCopyConfig(config: any) {
    console.log(config);
  }

  function onSettingClick() {
    showSetting.value = true;
  }
</script>

<style lang="less">
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 4px;
    background-color: theme('colors.primary.500');
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: theme('colors.primary.400');

    &:hover {
      background-color: theme('colors.primary.500');
    }
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 4px;
    background: theme('backgroundColor.layout');
  }

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

    &.setting {
      font-size: 18px;
    }

    &.notice {
      font-size: 18px;
    }
  }
</style>
