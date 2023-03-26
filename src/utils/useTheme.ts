import { useSettingStore } from '@/store';
import { onBeforeMount, onUnmounted, onActivated, onDeactivated } from 'vue';

export function useUnbounded() {
  const { setContentClass } = useSettingStore();

  const setUnbounded = () => {
    setContentClass('unbounded');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  };

  const removeUnbounded = () => {
    setContentClass('common');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  };

  onBeforeMount(setUnbounded);
  onUnmounted(removeUnbounded);
  onActivated(setUnbounded);
  onDeactivated(removeUnbounded);
}
