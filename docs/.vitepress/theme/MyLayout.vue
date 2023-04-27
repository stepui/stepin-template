<script lang="ts" setup>
  import { onBeforeMount, watch } from 'vue';
  import { useThemeStore } from 'stepin/es/theme-provider';
  import Theme from 'vitepress/theme';
  import { useData } from 'vitepress';
  const { Layout } = Theme;

  const { isDark } = useData();

  const { setBgSeriesColors, setPrimaryColor, setFont } = useThemeStore();

  onBeforeMount(() => {
    setFont({ 'font-size': '16px' });
    setPrimaryColor({ DEFAULT: '#8B5CF6' });
    setTheme();
  });

  function setTheme() {
    if (isDark.value) {
      setBgSeriesColors({ 'bg-base': '#1e1e20', 'bg-side': '#161618' });
    } else {
      setBgSeriesColors({ 'bg-base': '#fff', 'bg-side': '#f6f6f7' });
    }
  }

  watch(isDark, () => {
    setTheme();
  });
</script>
<template>
  <Layout> </Layout>
</template>
