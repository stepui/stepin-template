import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const pageLoading = ref(false);
  const authLoading = ref(false);

  /**
   * 设置页面加载状态
   * @param loading
   */
  function setPageLoading(loading: boolean) {
    pageLoading.value = loading;
  }

  /**
   * 设置权限加载状态
   * @param loading
   */
  function setAuthLoading(loading: boolean) {
    authLoading.value = loading;
  }
  return { pageLoading, authLoading, setPageLoading, setAuthLoading };
});
