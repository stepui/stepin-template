import { onMounted, ref, onBeforeUnmount } from 'vue';

/**
 * 计算元素距离屏幕左上距离
 * @param el
 * @returns
 */
export function offsetScreen(el: HTMLElement) {
  let { offsetLeft, offsetTop } = el;

  if (el.offsetParent) {
    const [left, top] = offsetScreen(el.offsetParent as HTMLElement);
    offsetLeft += left;
    offsetTop += top;
  }

  return [offsetLeft, offsetTop];
}

/**
 * 全屏api
 * @param target 需要全屏的元素
 * @returns
 */
export function useFullScreen(target: HTMLElement | string) {
  let _target: HTMLElement = undefined;
  const name = typeof target === 'object' ? target.tagName : target;
  onMounted(() => {
    document.addEventListener('fullscreenchange', fullscreenListener);
    document.addEventListener('webkitfullscreenchange', fullscreenListener);
    document.addEventListener('mozfullscreenchange', fullscreenListener);
    document.addEventListener('msfullscreenchange', fullscreenListener);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', fullscreenListener);
    document.removeEventListener('webkitfullscreenchange', fullscreenListener);
    document.removeEventListener('mozfullscreenchange', fullscreenListener);
    document.removeEventListener('msfullscreenchange', fullscreenListener);
  });

  let state = false;
  const isEnter = ref(state);
  function fullscreenListener(e: Event) {
    if (e.target !== _target) {
      isEnter.value = false;
      state = false;
    } else {
      state = !state;
      isEnter.value = state;
    }
  }

  /**
   * 进入全屏
   * @returns
   */
  async function enterFullScreen() {
    return new Promise((resolve, reject) => {
      _target = typeof target === 'string' ? document.querySelector(target) : target;
      if (_target) {
        // @ts-ignore
        const { requestFullscreen, webkitRequestFullScreen, mozRequestFullScreen, msRequestFullscreen } = _target;
        const _requestFullscreen: () => void =
          requestFullscreen ?? webkitRequestFullScreen ?? mozRequestFullScreen ?? msRequestFullscreen;

        if (_requestFullscreen) {
          const _result = _requestFullscreen.apply(_target) as any;
          if (_result instanceof Promise) {
            _result.then(() => resolve(null)).catch((e) => reject(e));
          } else {
            resolve(null);
          }
        } else {
          reject(`sorry, your browser don't support fullscreen feature`);
        }
      } else {
        reject(`can'nt find target element ${name} for fullscreen`);
      }
    });
  }

  async function exitFullscreen() {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const { exitFullscreen, webkitCancelFullScreen, mozCancelFullScreen, msExitFullscreen } = document;
      const _exitFullscreen: () => void =
        exitFullscreen ?? webkitCancelFullScreen ?? mozCancelFullScreen ?? msExitFullscreen;
      if (_exitFullscreen) {
        const _result = _exitFullscreen.apply(document) as any;
        if (_result instanceof Promise) {
          _result.then(() => resolve(null)).catch((e) => reject(e));
        } else {
          isEnter.value = false;
          resolve(null);
        }
      } else {
        reject(`sorry, your browser don't support fullscreen feature`);
      }
    });
  }
  return { enterFullScreen, exitFullscreen, isEnter };
}
