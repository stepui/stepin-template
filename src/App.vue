<template>
  <stepin-config-provider :theme-config="customTheme">
    <stepin-view
      system-name="Stepin Template"
      :logo-src="logoSrc"
      :class="`${theme}`"
      :user="{
        name: 'iczer',
        avatar:
          'https://portrait.gitee.com/uploads/avatars/user/691/2073535_iczer_1578965604.png',
        menuList: [
          { title: '个人中心', key: 'personal', icon: 'UserOutlined' },
          { title: '设置', key: 'setting', icon: 'SettingOutlined' },
          { type: 'divider' },
          { title: '退出登录', key: 'logout', icon: 'LogoutOutlined' },
        ],
      }"
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
        <div class="action-item setting" @click="onSettingClick">
          <SettingOutlined />
        </div>
      </template>
      <template #pageFooter>
        <page-footer />
      </template>
    </stepin-view>
    <login-modal
      :visible="!loginStatus && $route.path !== '/login'"
      @login="onLogin"
      :loading="loginLoading"
    />
  </stepin-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageFooter from '/@/components/layout/PageFooter.vue';
  import logoSrc from '/@/assets/logo.png';
  import giteeLogo from '/@/assets/gitee.svg';
  import { LoginModal } from './components/login-box';
  import { mapState } from 'vuex';
  import { userService } from '/@/services';
  import { LoginForm } from '/@/types';
  import { nightTheme, lightTheme, defaultTheme } from 'stepin/es/theme';
  import { customTheme } from '/@/theme';

  export default defineComponent({
    name: 'App',
    components: { PageFooter, LoginModal },
    data() {
      return {
        collapsed: false,
        logoSrc,
        giteeLogo,
        showSetting: false,
        showLogin: false,
        loginLoading: false,
        nightTheme,
        lightTheme,
        defaultTheme,
        customTheme,
      };
    },
    provide: {
      return() {
        app: this;
      },
    },
    computed: {
      ...mapState(['loginStatus', 'theme']),
    },
    created() {
      console.log(this.customTheme);
    },
    methods: {
      userMenuClick(key: string) {
        switch (key) {
          case 'setting':
            const str = key ?? '';
            console.log(str);

            this.showSetting = true;
            break;
          case 'logout':
            userService.logout().then((res) => {
              const { message, code } = res;
              if (code === 0) {
                this.$router?.push('/login');
                this.$message.success(message);
              }
            });
          default:
            console.log(key, 'user-menu-click');
        }
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
      login() {
        this.showLogin = true;
      },
      onLogin({ username, password }: LoginForm) {
        this.loginLoading = true;
        userService.login(username, password).then((res) => {
          const { message, code } = res;
          if (code === 0) {
            this.showLogin = false;
            // @ts-ignore
            this.$message.success(message);
          }
          this.loginLoading = false;
        });
      },
    },
  });
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
    background: theme('backgroundColor.base');
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
  }
</style>
