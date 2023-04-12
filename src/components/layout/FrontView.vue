<script lang="ts" setup>
  import { LogoutOutlined } from '@ant-design/icons-vue';
  import { ref, onMounted } from 'vue';
  import useThemeStore from 'stepin/es/theme-editor/store';
  import { alert } from 'stepin';

  const { setBgSeriesColors, setPrimaryColor } = useThemeStore();
  onMounted(() => {
    setBgSeriesColors({ 'bg-base': '#003f8c' }, true, '.front-main');
    setPrimaryColor({ DEFAULT: '#1896ff' }, '.front-main');
    alert.info(
      `<div class="text-text">
        Stepin is a fast, light framework to Vue3 – try it out today with the
        <span class="underline">Stepin Template Beta</span>.
      </div>`,
      { renderRaw: true, duration: -1 }
    );
  });

  const navList = [
    {
      title: 'Products',
      children: [
        {
          title: 'Stepin Template',
          list: ['Stepin Pro', 'Stepin Style', 'Stepin Admin'],
        },
        {
          title: 'Stepin',
          list: ['Stepin Vue', 'Stepin React', 'Stepin Angular'],
        },
      ],
    },
    {
      title: 'Developers',
      children: [
        {
          title: 'Developers',
          list: ['Docs', 'Get Started', 'UI Library', 'Community', 'Open Source'],
        },
      ],
    },
    {
      title: 'Sponsors',
    },
    {
      title: 'Business',
      children: [{ title: 'Business', list: ['Contact Us', 'Cooperation', 'Support'] }],
    },
    {
      title: 'About Us',
    },
  ];

  const showMessage = ref(true);

  const message = ref<HTMLDivElement>();
  function onClose() {
    message.value!.setAttribute('style', `margin-top: ${0 - message.value!.clientHeight}px`);
    setTimeout(() => (showMessage.value = false), 150);
  }
</script>
<template>
  <div class="front-view flex flex-col">
    <div class="front-main bg-[#003f8c] text-text flex-1">
      <div class="front-header flex items-baseline py-md px-xl">
        <router-link to="/home" class="text-xxl text-text hover:text-text">
          <img src="@/assets/vite.svg" />
          Stepin
        </router-link>
        <div
          style="width: calc(100% - 430px)"
          class="front-navigation mx-xl flex overflow-hidden items-center text-lg overflow-ellipsis whitespace-nowrap"
        >
          <div :class="`front-nav-item mx-base ${nav.children ? 'with-list' : ''}`" v-for="nav in navList">
            <template v-if="!nav.children">
              {{ nav.title }}
            </template>
            <a-popover :mouseEnterDelay="0.1" v-else placement="bottom">
              <div class="front-nav-item-content">
                {{ nav.title }}
              </div>
              <template #content>
                <div class="flex">
                  <div class="not-[:first-child]:ml-lg" v-for="group in nav.children">
                    <h3>{{ group.title }}</h3>
                    <div
                      class="cursor-pointer hover:text-text text-subtext font-light py-xs text-lg"
                      v-for="item in group.list"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </div>
        </div>
        <div>
          <router-link
            to="/login"
            class="h-[46px] border-transparent hover:text-text hover:border-transparent text-lg text-text"
          >
            <LogoutOutlined class="mr-xs" />
            Sign In
          </router-link>
          <a-button
            class="ml-md px-lg border-text hover:border-text hover:bg-text border-2 h-[46px] hover:text-bg-container"
            size="large"
            >Get Started</a-button
          >
        </div>
      </div>
      <div class="front-content px-xl">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .front-view {
    .front-header {
      .front-nav-item {
        @apply flex items-center cursor-pointer;
        &.with-list .front-nav-item-content {
          &:after {
            content: '';
            @apply ~"h-[8px]" ~"w-[8px]" transition-transform ml-2 inline-block border-text border-l-0 border-t-0 border-r-2 border-b-2 border-solid ~"rotate-[-135deg]" translate-y-1/4;
          }
          &:hover {
            &:after {
              @apply ~"rotate-[45deg]" translate-y-0;
            }
          }
        }
      }
    }
    .front-content {
      min-height: calc(100vh - 78px);
    }
  }
</style>
