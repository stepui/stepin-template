<script lang="ts" setup>
  import { reactive } from 'vue';
  import { StepinHeaderAction } from 'stepin';
  import Notice from '@/components/notice/Notice.vue';
  import DayNightSwitch from '@/components/switch/DayNightSwitch.vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import Fullscreen from '../fullscreen/Fullscreen.vue';

  defineEmits<{
    (e: 'showSetting'): void;
  }>();

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
</script>
<template>
  <StepinHeaderAction>
    <a-input placeholder="开始搜索...">
      <template #prefix>
        <search-outlined />
      </template>
    </a-input>
  </StepinHeaderAction>
  <StepinHeaderAction>
    <DayNightSwitch />
  </StepinHeaderAction>
  <StepinHeaderAction>
    <a class="action-item" href="http://github.com/stepui/stepin-template" target="_blank">
      <GithubOutlined />
    </a>
  </StepinHeaderAction>
  <StepinHeaderAction>
    <a class="action-item" href="http://gitee.com/stepui/stepin-template" target="_blank">
      <img class="gitee-logo" src="@/assets/gitee.svg" />
    </a>
  </StepinHeaderAction>
  <StepinHeaderAction>
    <div class="action-item setting" @click="$emit('showSetting')">
      <SettingOutlined />
    </div>
  </StepinHeaderAction>

  <a-popover placement="bottomRight">
    <StepinHeaderAction>
      <div class="action-item notice">
        <BellOutlined />
      </div>
    </StepinHeaderAction>
    <template #content>
      <Notice :data-source="noticeList" />
    </template>
  </a-popover>
  <StepinHeaderAction>
    <Fullscreen class="-mx-xs -my-sm h-[56px] px-xs py-sm flex items-center" target=".stepin-layout" />
  </StepinHeaderAction>
</template>
<style scoped lang="less">
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
