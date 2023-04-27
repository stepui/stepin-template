<script setup>
  import { ref, watch, reactive, onBeforeMount} from 'vue';
  import ColorPicker from 'stepin/es/color-picker';
  import LabelWrapper from 'stepin/es/label-wrapper';
  import { useThemeStore } from 'stepin/es/theme-provider';
  import CodeSandbox from 'stepin/es/code-sandbox';
  import {storeToRefs} from 'pinia'

  const themeStore = useThemeStore();

  const { setPrimaryColor, setFont, setFunctionalColor, setTextSeriesColors, setBgSeriesColors } = themeStore;
  const { theme } = storeToRefs(themeStore);
  
  const color = ref(theme.value.color.primary.DEFAULT)

  watch(color, (val) => setPrimaryColor({DEFAULT: val}));

  const code = `
<button class="bg-primary text-text-inverse px-2 py-[2px] rounded">默认色</button>
<span class="text-primary-text hover:text-primary-text-hover font-bold ml-2">文本色</span>
<span class="text-primary-text-active ml-2 font-bold">文本激活色</span>
<span class="p-1 border border-solid border-primary-border hover:border-primary-border-hover ml-2">边框色</span>
<span class="bg-primary-bg inline-block p-1 hover:bg-primary-bg-hover ml-2">背景色</span>`

  const functionColors = [
    {title: '信息色', key: 'info'},
    {title: '警告色', key: 'warning'},
    {title: '成功色', key: 'success'},
    {title: '错误色', key: 'error'},
  ]

  const darkText = reactive({
    textBase: '#fff',
    text1: 'rgb(255, 255, 255)',
    text2: 'rgba(255, 255, 255, 0.85)',
    text3: 'rgba(255, 255, 255, 0.65)',
    text4: 'rgba(255, 255, 255, 0.45)',
  })

  onBeforeMount(() => setBgSeriesColors({'bg-base': '#23272E'}, true, '.dark-text-picker+table'))

  function setDarkText(val) {
    const modify = setTextSeriesColors({'text-base': val}, '.dark-text-picker+table')
    console.log()
    darkText.textBase = val
    darkText.text1 = modify['text-1']
    darkText.text2 = modify['text-2']
    darkText.text3 = modify['text-3']
    darkText.text4 = modify['text-4']
  }

  const bgColor = reactive({
    bgBase: '#fff',
    bgLayout: '#fff',
    bgContainer: '#fff',
    bgPopover: '#fff',
  })

  function setBgColor(color) {
    const modify = setBgSeriesColors({'bg-base': color})
    setBgSeriesColors({'bg-side': modify['bg-layout']})
  }

</script>
# 颜色
得益于 ant design 色彩设计体系，stepin template 可以根据规则生成一套平衡了可读性、美感以及可用性的衍生色。
## 主题色
系统主题色可以自由定义，它主要用一些组件及功能性文本上。点击下面的拾色器，可以看到面板底部内置的推荐颜色：
<ColorPicker v-model="color" />

使用 `setPrimaryColor` 设置主题色

```vue
<script lang="ts" setup>
import { useThemeStore } from 'stepin/es/theme-provider';

const { setPrimaryColor } = useThemeStore();
setPrimaryColor({DEFAULT: '#3B82F6'});
</script>
```
使用 `ThemeProvider` 组件配置主题：
```vue
<template>
  <ThemeProvider :color="{ primary: { DEFAULT: '#3B82F6'}}">
    <stepin-view>...</stepin-view>
  </ThemeProvider>
</template>
<script lang="ts" setup>
  import { ThemeProvider } from 'stepin/es/theme-provider'
</script>
```
根据主色，系统还会自动生成一系列衍生色，方便使用：
<div style="display: flex; algin-items:center;">
  <ColorPicker v-model="color" />
  <div class="color-palate">
    <div class="color-item" :style="`background: var(--color-primary-${i})`" v-for="i in 10" />
  </div>
</div>

如果想对主色衍生色做定制，一样使用 `setPrimaryColor` 设置即可：

```ts
import { useThemeStore } from 'stepin/es/theme-provider';

const { setPrimaryColor } = useThemeStore();
setPrimaryColor({
  'DEFAULT': string;            // 主色默认色
  'bg': string;                 // 主色衍生背景色
  'bg-hover': string;           // 主色衍生悬浮色
  'border': string;             // 主色衍生边框色
  'border-hover': string;       // 主色衍生悬浮边框色
  'hover': string;              // 主色衍生悬浮色
  'active': string;             // 主色衍生激活色
  'text': string;               // 主色衍生文本色
  'text-hover': string;         // 主色衍生文本悬浮色
  'text-active': string;        // 主色衍生文本激活色
});
```

使用 ThemeProvider 定制
```vue
<template>
  <ThemeProvider :color="{
    primary: {
      bg: '#3B82F6',
      'bg-hover': '#3B82F6',
      border: '#3B82F6',
    }
  }">
    <stepin-view>...</stepin-view> 
  </ThemeProvider>
</template>
<script lang="ts" setup>
  import { ThemeProvider } from 'stepin/es/theme-provider'
</script>
```

<CodeSandbox
  theme="dark"
  :code="code"
  title="使用示例"
  :highlightWords="['primary-(bg|border|hover|active|text)(-(hover|active))?']"
  describe="这些颜色都集成到 tailwindcss 主题中了，可以很方便的使用。详细可以查看 tailwindcss 变量对照表"
>
  <div v-html="code"></div>
</CodeSandbox>

## 功能色
功能色分为四种：信息色、警告色、错误色、成功色。它们的用法和主色用法基本一致：
<LabelWrapper :label="color.title" v-for="color in functionColors">
  <div class="flex items-center">
    <ColorPicker
      :modelValue="theme.color[color.key].DEFAULT"
      @update:modelValue="val => setFunctionalColor(color.key, {DEFAULT: val})"
    />
    <div class="color-palate">
      <div class="color-item" :style="`background: var(--color-${color.key}-${i})`" v-for="i in 10"></div>
    </div>
  </div>
</LabelWrapper>

可以通过 `setFunctionalColor` 设置功能色：
```ts
import { useThemeStore } from 'stepin/es/theme-provider';

const { setFunctionalColor } = useThemeStore();
// 设置信息色默认色，自动生成衍生色
setFunctionalColor('info', {DEFAULT: '#0ea5e9'});
// 设置警告色默认色，自动生成衍生色
setFunctionalColor('warning', {DEFAULT: '#f97316'});
// 设置成功色默认色，自动生成衍生色
setFunctionalColor('success', {DEFAULT: '#10ba81'});
// 设置错误色默认色，自动生成衍生色
setFunctionalColor('error', {DEFAULT: '#ef4343'});
```
使用 ThemeProvider 定制：
```vue
<template>
  <ThemeProvider :color="{
    info: { DEFAULT: '#0ea5e9'},
    warning: { DEFAULT: '#f97316'},
  }">
    <stepin-view>...</stepin-view> 
  </ThemeProvider>
</template>
<script lang="ts" setup>
  import { ThemeProvider } from 'stepin/es/theme-provider'
</script>
```
功能色的衍生色也可以自由定制：
```ts
import { useThemeStore } from 'stepin/es/theme-provider';

const { setFunctionalColor } = useThemeStore();
setFunctionalColor(
  type: 'info' | 'warning' | 'success' | 'error', // 功能色类型
  {
    'DEFAULT': string;                            // 功能色默认色
    'bg': string;                                 // 功能色衍生背景色
    'bg-hover': string;                           // 功能色衍生悬浮色
    'border': string;                             // 功能色衍生边框色
    'border-hover': string;                       // 功能色衍生悬浮边框色
    'hover': string;                              // 功能色衍生悬浮色
    'active': string;                             // 功能色衍生激活色
    'text': string;                               // 功能色衍生文本色
    'text-hover': string;                         // 功能色衍生文本悬浮色
    'text-active': string;                        // 功能色衍生文本激活色
  }
);
```
使用 ThemeProvider 定制：
```vue
<template>
  <ThemeProvider :color="{
    info: {
      bg: '#3B82F6',
      'bg-hover': '#3B82F6',
      border: '#3B82F6',
    },
    warning: {
      bg: '#3B82F6',
      'bg-hover': '#3B82F6',
      border: '#3B82F6',
    }
  }">
    <stepin-view>...</stepin-view> 
  </ThemeProvider>
</template>
<script lang="ts" setup>
  import { ThemeProvider } from 'stepin/es/theme-provider'
</script>
```
## 文本色
文本色可细分为：`一级文本色`、`二级文本色`、`三级文本色`和`四级文本色`，它们由文本基色生成，可运用于不同的场景需求。
* 亮色背景文本基色：
<ColorPicker class="align-middle" :modelValue="theme.color.middle['text-base']" @update:modelValue="val => setTextSeriesColors({'text-base': val})" />

| 名称 | 颜色 | 色值 |
|--|:--:|--|
|一级文本色|<div class="bg-text rounded inline-block h-5 w-5"></div>|{{theme.color.middle['text-1']}}|
|二级文本色|<div class="bg-text-2 rounded inline-block h-5 w-5"></div>|{{theme.color.middle['text-2']}}|
|三级文本色|<div class="bg-text-3 rounded inline-block h-5 w-5"></div>|{{theme.color.middle['text-3']}}|
|四级文本色|<div class="bg-text-4 rounded inline-block h-5 w-5"></div>|{{theme.color.middle['text-4']}}|

* 暗色背景文本基色：
<ColorPicker class="align-middle dark-text-picker" :modelValue="darkText.textBase"
@update:modelValue="setDarkText" />

| 名称 | 颜色 | 色值 |
|--|:--:|--|
|一级文本色|<div class="bg-text rounded inline-block h-5 w-5"></div>|{{darkText['text1']}}|
|二级文本色|<div class="bg-text-2 rounded inline-block h-5 w-5"></div>|{{darkText['text2']}}|
|三级文本色|<div class="bg-text-3 rounded inline-block h-5 w-5"></div>|{{darkText['text3']}}|
|四级文本色|<div class="bg-text-4 rounded inline-block h-5 w-5"></div>|{{darkText['text4']}}|

::: tip TIP
当你使用 `stepin` 主题 api 设置背景色时，文本色会自动适配。
:::

::: info INFO `文本衍生色`
当设置文本色时，系统还会生成一系列文本色衍生色，如`边框色`和`填充色`等，供更多场景使用。
详情可查看 **tailwindcss 与 css变量**
:::

文本衍生色也可以自由定义：
``` ts
import { useThemeStore } from 'stepin/es/theme-provider';

const { setTextSeriesColors } = useThemeStore();
setTextSeriesColors({
  'text-base': string;        // 文本基色
  'text': string;             // 默认文本色
  'text-1': string;           // 一级文本色
  'text-2': string;           // 一级文本色
  'text-3': string;           // 一级文本色
  'text-4': string;           // 一级文本色
  'subtext': string;          // 次级文本色
  'text-disabled': string;    // 禁用文本色
  'fill': string;             // 默认填充色
  'fill-1': string;           // 一级填充色
  'fill-2': string;           // 二级填充色
  'fill-3': string;           // 三级填充色
  'fill-4': string;           // 四级填充色
  'shadow': string;           // 阴影色
  'shadow-light': string;     // 阴影色淡
  'border': string;           // 默认边框色
  'border-1': string;         // 一级边框色
  'border-2': string;         // 二级边框色
})
```

使用 ThemeProvider 定制：
```vue
<template>
  <ThemeProvider :color="{
    middle: {
      'text-base': '#fff',
      'text-disabled': '#9a9a9a',
    }
  }">
    <stepin-view>...</stepin-view> 
  </ThemeProvider>
</template>
<script lang="ts" setup>
  import { ThemeProvider } from 'stepin/es/theme-provider'
</script>
```
## 背景色
背景色可分为：`布局背景色`、`容器背景色`、`菜单背景色`以及`浮窗背景色`。
只需设置背景基色，其它的衍生背景色将自动生成。
<ColorPicker :modelValue="theme.color.middle['bg-base']" @update:modelValue="setBgColor" />

|名称|颜色|色值|
|--|--|--|
|布局背景色|<div class="h-5 w-5 bg-layout border border-solid border-border"></div>|{{theme.color.middle['bg-layout']}}|
|容器背景色|<div class="h-5 w-5 bg-container border border-solid border-border"></div>|{{theme.color.middle['bg-container']}}|
|浮窗背景色|<div class="h-5 w-5 bg-popover border border-solid border-border"></div>|{{theme.color.middle['bg-popover']}}|

背景色有一系列衍生色，全部可自由定义：
```ts
import { useThemeStore } from 'stepin/es/theme-provider';

const { setBgSeriesColors } = useThemeStore();
setBgSeriesColors({
  'bg-base': string;              // 背景基色
  'bg-layout': string;            // 布局背景色
  'bg-container': string;         // 容器背景色
  'bg-container-light': string;   // 容器次级背景色
  'bg-popover': string;           // 浮窗背景色
  'bg-spotlight': string;         // 关注背景色
  'bg-mask': string;              // 遮罩背景色
  'bg-hover': string;             // 悬浮背景色
  'bg-disabled': string;          // 禁用背景色
  'bg-side': string;              // 侧边背景色
  'bg-header': string;            // 顶部背景色
  'bg-menu': string;              // 菜单背景色
  'bg-submenu': string;           // 子级菜单背景色
})
```

使用 ThemeProvider 定制：
```vue
<template>
  <ThemeProvider :color="{
    middle: {
      'bg-base': '#000',
      'bg-disabled': '#9a9a9a',
    }
  }">
    <stepin-view>...</stepin-view> 
  </ThemeProvider>
</template>
<script lang="ts" setup>
  import { ThemeProvider } from 'stepin/es/theme-provider'
</script>
```

<style lang="less">
.color-palate {
  display: inline-grid;
  margin-left: 24px;
  grid-template-columns: repeat(10, 1fr);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  overflow: hidden;
  .color-item {
    width: 24px;
    height: 24px;
  }
}
.dark-text-picker+table {
  color: var(--color-text);
  th {
    background: var(--color-bg-container-light);
    color: var(--color-text-2);
    border-color: var(--color-border);
  }
  td {
    border-color: var(--color-border);
  }
  tr {
    background: var(--color-bg-container);
  }
  tr:nth-child(2n) {
    background: var(--color-bg-container-light);
  }
  tr:nth-child(1) {
    color: var(--color-text);
  }
  tr:nth-child(2) {
    color: var(--color-text-2);
  }
  tr:nth-child(3) {
    color: var(--color-text-3);
  }
  tr:nth-child(4) {
    color: var(--color-text-4);
  }
}
.vp-doc table {
  tr:nth-child(2n), th {
    background: var(--color-bg-container-light);
  }
  th {
    color: var(--color-text-2);
  }
  td, th {
    border-color: var(--color-border);
  }
}
</style>