<template>
  <div class="test-page">
    <div>
      <a-button @click="showGuid = true">新手引导1</a-button>
      <a-button class="btn1" ref="btn1" type="primary" @click="target = btn2"
        >button 1</a-button
      >
      <a-button class="btn2" ref="btn2" type="primary" @click="target = btn1"
        >button 2</a-button
      >
    </div>
    <Guider :current="target" :options="options" v-model:show="showGuid">
      <div ref="doc">功能指引</div>
    </Guider>
  </div>
</template>

<script lang="ts" setup>
  import { ComponentPublicInstance, onMounted, reactive, ref } from 'vue';
  import Guider, { GuiderOption } from '@/components/guider/Guider.vue';

  const btn1 = ref<ComponentPublicInstance>();
  const btn2 = ref<ComponentPublicInstance>();
  const doc = ref<HTMLElement>();

  let options = reactive<GuiderOption[]>([]);

  const target = ref<ComponentPublicInstance | HTMLElement>();

  const showGuid = ref(false);

  onMounted(() => {
    target.value = btn1.value;
    options.push(
      {
        target: btn1.value,
        doc: doc.value,
      },
      {
        target: btn2.value,
        doc: doc.value,
      }
    );
  });
</script>

<style lang="less" scoped>
  .test-page {
    height: calc(100vh);
    padding: 24px;
    position: relative;

    .ant-btn {
      position: absolute;
    }

    .btn1 {
      left: 0px;
      top: 92px;
    }

    .btn2 {
      top: 92px;
      right: 0;
    }

    .btn3 {
      bottom: 0;
      right: 0;
    }

    .btn4 {
      bottom: 0;
      left: 0px;
    }

    .btn5 {
      left: calc(50% - 85px);
      top: calc(50% - 32px);
    }

    .btn6 {
      left: calc(50%);
      top: calc(50% - 32px);
    }

    .btn7 {
      left: calc(50% - 85px);
      top: calc(50%);
    }

    .btn8 {
      left: calc(50%);
      top: calc(50%);
    }
  }
</style>
