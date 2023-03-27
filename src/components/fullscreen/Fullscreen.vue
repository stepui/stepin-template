<script lang="ts" setup>
  import { ref, PropType, watch } from 'vue';
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  import { useFullScreen } from '@/utils/htmlHelper';

  const prop = defineProps({
    target: { type: [String, Object] as PropType<string | HTMLElement>, required: true },
  });

  const emit = defineEmits<{
    (e: 'change', value: boolean);
  }>();

  const { enterFullScreen, exitFullscreen, isEnter } = useFullScreen(prop.target);

  function toggle() {
    if (isEnter.value) {
      exitFullscreen();
    } else {
      enterFullScreen();
    }
  }

  watch(isEnter, (val) => emit('change', val));
</script>
<template>
  <div class="inline-block text-lg" @click="toggle">
    <FullscreenExitOutlined v-if="isEnter" />
    <FullscreenOutlined v-else />
  </div>
</template>
<style scoped lang="less"></style>
