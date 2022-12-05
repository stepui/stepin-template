<script lang="ts" setup>
  import { offsetScreen } from '@/utils/htmlHelper';
  import { GuiderOption, GuideTarget } from './interface';
  import { PropType, watch, reactive, computed, ref, onMounted, onBeforeUnmount } from 'vue';

  const props = defineProps({
    current: [HTMLElement, Object, String] as PropType<GuideTarget>,
    options: {
      required: true,
      type: Array<GuiderOption>,
    },
    show: Boolean,
  });

  const index = ref(0);

  const currentIndex = computed({
    get(): number {
      if (!props.current) {
        return index.value;
      }
      index.value = props.options.findIndex((item) => item.target === props.current);
      return index.value;
    },
    set(val) {
      const target = props.options[val];
      if (target) {
        index.value = val;
        emit('update:current', target.target);
      } else {
        index.value = 0;
        emit('close');
        emit('update:current', props.options[0].target);
        emit('update:show', false);
      }
    },
  });

  const doc = ref<HTMLElement>();

  const flag = ref(props.show);

  const location = reactive({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  // 事件
  // defineEmits(['close', 'update:show', 'update:current'])
  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'update:show', show: boolean): void;
    (e: 'update:current', target?: GuideTarget): void;
  }>();

  // 目标 html 元素
  const targetEl = computed<HTMLElement>(() => {
    const _el = props.current ?? props.options[index.value]?.target;
    if (!_el) {
      return;
    }
    if (typeof _el === 'string') {
      return document.querySelector(_el);
    } else {
      // @ts-ignore
      return _el instanceof HTMLElement ? _el : _el.$el;
    }
  });

  // 方位
  type Direction = 'vertical' | 'horizontal';
  // 朝向
  type Site = 'top' | 'right' | 'bottom' | 'left';
  // 位置
  type Placement = {
    main: Direction;
    sub: Direction;
    vertical: Site | 'center';
    horizontal: Site | 'center';
  };

  // doc 文档显示位置
  const placement = computed<Placement>(() => {
    const { offsetWidth: docWidth, offsetHeight: docHeight } = doc.value || {
      offsetWidth: 0,
      offsetHeight: 0,
    };
    const { left: tLeft, top: tTop, right: tRight, bottom: tBottom, height: tHeight, width: tWidth } = location;

    const p: Placement = {
      main: 'horizontal',
      sub: 'vertical',
      horizontal: 'left',
      vertical: 'top',
    };

    // 判断文档位置在主方向为水平还是垂直
    if (Math.max(tLeft, tRight) >= Math.max(tTop, tBottom)) {
      p.main = 'horizontal';
      p.sub = 'vertical';
      p.horizontal = tLeft > tRight ? 'left' : 'right';
      if (tTop + tHeight / 2 < docHeight / 2 && tBottom + tHeight / 2 > docHeight / 2) {
        p.vertical = 'top';
      } else if (tTop + tHeight / 2 > docHeight / 2 && tBottom + tHeight / 2 < docHeight / 2) {
        p.vertical = 'bottom';
      } else {
        p.vertical = 'center';
      }
    } else {
      p.main = 'vertical';
      p.sub = 'horizontal';
      p.vertical = tTop > tBottom ? 'top' : 'bottom';
      if (tLeft + tWidth / 2 < docWidth / 2 && tRight + tWidth / 2 > docWidth / 2) {
        p.horizontal = 'left';
      } else if (tLeft + tWidth / 2 > docWidth / 2 && tRight + tWidth / 2 < docWidth / 2) {
        p.horizontal = 'right';
      } else {
        p.horizontal = 'center';
      }
    }
    return p;
  });

  type Position = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  // 指引文档位置
  const docPosition = computed(() => {
    const p: Position = { left: 0, top: 0 };
    if (!props.show || !doc.value || !flag.value) {
      return p;
    }

    const { top, left, right, bottom, height, width } = location;

    const place = placement.value;
    const main = place[place.main] as Site;
    const sub = place[place.sub];

    const margin = 10;
    const offset = (place.main === 'horizontal' ? doc.value?.offsetWidth : doc.value?.offsetHeight) ?? 0;
    p[main] = location[main] - offset - margin;

    if (main === 'right') {
      p.left = left + width + margin;
    } else if (main === 'bottom') {
      p.top = top + height + margin;
    }

    if (sub === 'center') {
      if (place.main === 'horizontal') {
        p.top = top + height / 2 - (doc.value?.offsetHeight ?? 0) / 2;
      } else {
        p.left = left + width / 2 - (doc.value?.offsetWidth ?? 0) / 2;
      }
    } else {
      p[sub] = location[sub];
    }

    if (p.left === undefined) {
      p.left = window.innerWidth - p.right! - doc.value?.offsetWidth!;
    }

    if (p.top === undefined) {
      p.top = window.innerHeight - p.bottom! - doc.value?.offsetHeight!;
    }

    return p;
  });

  // 指示箭头位置
  const arrowStyle = computed(() => {
    const p: Position = { left: -16, top: -16 };

    if (!props.show || !doc.value || !flag.value) {
      return p;
    }

    const place = placement.value;
    const main = place[place.main] as Site;
    const sub = place[place.sub];

    const { offsetHeight = 0, offsetWidth = 0 } = doc.value ?? {};

    if (main === 'left') {
      p.left = (offsetWidth ?? 0) - 4;
    } else if (main === 'top') {
      p.top = (offsetHeight ?? 0) - 4;
    }

    if (place.main === 'horizontal') {
      if (sub === 'center') {
        p.top = offsetHeight / 2 - 10;
      } else if (sub === 'bottom') {
        p.top = offsetHeight - location.height / 2 - 10;
      } else {
        p.top = location.height / 2 - 10;
      }
    }

    if (place.main === 'vertical') {
      if (sub === 'center') {
        p.left = offsetWidth / 2 - 10;
      } else if (sub === 'right') {
        p.left = offsetWidth - location.width / 2 - 10;
      } else {
        p.left = location.width / 2 - 10;
      }
    }
    return p;
  });

  /**
   * 设置目标元素位置
   */
  function setPosition() {
    const el = targetEl.value;
    if (!el) {
      return;
    }
    const p = offsetScreen(el);
    location.left = p[0];
    location.top = p[1];
    location.width = el.offsetWidth;
    location.height = el.offsetHeight;
    location.right = window.innerWidth - location.width - location.left;
    location.bottom = window.innerHeight - location.height - location.top;
  }

  watch(() => [targetEl.value, props.show], setPosition);

  watch(
    () => props.show,
    (val) => {
      flag.value = val;
    },
    {
      flush: 'post',
    }
  );

  onMounted(() => {
    window.addEventListener('resize', setPosition);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setPosition);
  });

  function nextStep() {
    currentIndex.value += 1;
  }

  function onClose() {
    emit('close');
    emit('update:show', false);
  }
</script>

<template>
  <Teleport to="body">
    <div class="guider" :style="`display: ${show ? 'static' : 'none'}`">
      <div class="guider-left" :style="`border-left: ${location.left - 2}px solid rgba(0, 0, 0, 0.25);`"></div>
      <div
        class="guider-top"
        :style="`left: ${location.left - 2}px; width: ${location.width + 4}px; border-top: ${
          location.top - 2
        }px solid rgba(0, 0, 0, 0.25);`"
      ></div>
      <div
        class="guider-right"
        :style="`left: ${location.left + location.width + 2}px; background-color: rgba(0, 0, 0, 0.25)`"
      ></div>
      <div
        class="guider-bottom"
        :style="`left: ${location.left - 2}px; width: ${location.width + 4}px; top: ${
          location.top + location.height + 2
        }px`"
      ></div>
      <div
        ref="doc"
        class="guider-doc flex flex-col justify-between rounded-md"
        :style="`left: ${docPosition.left}px;top:${docPosition.top}px`"
      >
        <div
          class="arrow"
          :style="`left: ${arrowStyle.left}px; top: ${arrowStyle.top}px; border-${
            placement[placement.main]
          }-color: white`"
        ></div>
        <div class="guider-content">
          <h1>第一步</h1>
          <div>
            <slot></slot>
          </div>
        </div>
        <div class="guider-footer flex justify-between w-full">
          <a-button @click="onClose">关闭</a-button>
          <a-button type="primary" @click="nextStep">下一步</a-button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="less">
  .guider-left {
    position: fixed;
    left: 0px;
    top: 0px;
    height: 100vh;
    z-index: 99;
  }

  .guider-top {
    position: fixed;
    z-index: 99;
    top: 0;
  }

  .guider-right {
    top: 0;
    right: 0;
    position: fixed;
    z-index: 99;
    height: 100vh;
  }

  .guider-bottom {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.25);
    bottom: 0;
    z-index: 99;
  }

  .guider-doc {
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.125);
    width: 20%;
    height: 200px;
    background-color: white;
    position: fixed;
    z-index: 100;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);
    padding: 6px 8px;

    .arrow {
      transition: all 0.25s ease-in;
      border-width: 10px;
      z-index: 9;
      border-style: solid;
      position: absolute;
      border-color: transparent;
    }

    .guider-footer {
    }
  }
</style>
