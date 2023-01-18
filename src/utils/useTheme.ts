import { useAppStore } from '@/store';
import { onBeforeMount, onUnmounted, onActivated, onDeactivated } from 'vue';

export function useUnbounded() {
  const appStore = useAppStore();

  const setUnbounded = () => {
    appStore.setTheme('unbounded');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  };

  const removeUnbounded = () => {
    appStore.setTheme('common');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  };

  onBeforeMount(setUnbounded);
  onUnmounted(removeUnbounded);
  onActivated(setUnbounded);
  onDeactivated(removeUnbounded);
}
