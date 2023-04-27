# ThemeProvider
我们提供了主题配置组件 `ThemeProvider`，可以很方便的对主题进行配置。

## 使用示例

```vue {2,7,9}
<template>
  <ThemeProvider :color="color" :size="size">
    <stepin-view ...>
      ...
    </stepin-view>
  </ThemeProvider>
</template>
<script lang="ts" setup>
  import { ThemeProvider } from 'stepin/es/theme-provider'

  const color = {
    middle: {
      'bg-base': '#134562'
    },
    primary: {
      DEFAULT: '#1865f4'
    },
    error: {
      DEFAULT: '#ff0000'
    },
  }

  const size = {
    'width-side': '240px',
    'width-side-collapsed': '96px'
  }
</script>
```
## ThemeProvider

|props|类型|默认值|描述|
|-----|----|-----|----|
|color|[ThemeColor](#themecolor)|--|颜色配置|
|size|[Size](#size)|--|尺寸配置|
|padding|[Padding](#padding)|--|内间距配置|
|margin|[Margin](#margin)|--|外间距配置|
|font|[Font](#font)|--|字体配置|
|shadow|[Shadow](#shadow)|--|阴影配置|
|radius|[Radius](#radius)|--|圆角配置|
|isRoot|boolean|false|主题配置是否挂载到根节点(`:root`)|
|themeClassName|string|--|主题配置挂载目标样式类名。如 themeClassName="myClass"，则表明主题配置的相关 css 变量都将添加至 `myClass` 类上|
|applyStyle|boolean|true|是否给ThemeProvider的一级子节点添加基础样式。如果为 true， 则会为一级子节点添加 `text-text` 和 `bg-container` 类|

## ThemeColor
|props|类型|默认值|描述|
|-----|----|-----|----|
|primary|[SeriesColor](#seriescolor)|--|主题色系列色|
|info|[SeriesColor](#seriescolor)|--|信息色系列色|
|success|[SeriesColor](#seriescolor)|--|成功色系列色|
|warning|[SeriesColor](#seriescolor)|--|警告色系列色|
|error|[SeriesColor](#seriescolor)|--|错误色系列色|
|middle|[MiddleColor](#middlercolor)|--|中性色系列色|

## SeriesColor
|props|类型|默认值|描述|
|-----|----|-----|----|
|DEFAULT|string|--|默认色|
|bg|string|--|背景色|
|bg-hover|string|--|背景色悬浮态|
|border|string|--|边框色|
|border-hover|string|--|边框色悬浮态|
|hover|string|--|悬浮色|
|active|string|--|激活色|
|text|string|--|文本色|
|text-hover|string|--|文本色悬浮态|
|text-active|string|--|文本色激活态|

## MiddlerColor
|props|类型|默认值|描述|
|-----|----|-----|----|
|text-base|string|--|文本基色|
|text|string|--|文本色|
|text-1|string|--|一级文本色|
|text-2|string|--|二级文本色|
|text-3|string|--|三级文本色|
|text-4|string|--|四级文本色|
|subtext|string|--|次级文本色|
|text-disabled|string|--|禁用文本色|
|fill|string|--|填充色|
|fill-1|string|--|一级填充色|
|fill-2|string|--|二级填充色|
|fill-3|string|--|三级填充色|
|fill-4|string|--|四级填充色|
|shadow|string|--|阴影|
|shadow-light|string|--|淡色阴影|
|border|string|--|边框色|
|border-1|string|--|一级边框色|
|border-2|string|--|二级边框色|
|bg-base|string|--|背景基色|
|bg-layout|string|--|布局背景色|
|bg-container|string|--|容器背景色|
|bg-container-light|string|--|容器背景色(淡)|
|bg-popover|string|--|浮窗背景色|
|bg-spotlight|string|--|焦点背景色|
|bg-mask|string|--|遮罩背景色|
|bg-hover|string|--|悬浮背景色|
|bg-disabled|string|--|禁用背景色|
|bg-side|string|--|侧边背景色|
|bg-header|string|--|顶部背景色|
|bg-menu|string|--|菜单背景色|
|bg-submenu|string|--|子级菜单背景色|

## Size
|props|类型|默认值|描述|
|-----|----|----|----|
|width-side|string|--|侧边宽度|
|width-side-collapsed|string|--|侧边收缩宽度|
|height-header|string|--|顶部高度|
|height-footer|string|--|底部高度|

## Padding
|props|类型|默认值|描述|
|-----|----|----|----|
|base|string|--|基础间距|
|default|string|--|默认间距|
|xxs|string|--|xxs 间距|
|xs|string|--|xs 间距|
|sm|string|--|sm 间距|
|md|string|--|md 间距|
|lg|string|--|lg 间距|
|xl|string|--|xl 间距|

## Margin
|props|类型|默认值|描述|
|-----|----|----|----|
|base|string|--|基础间距|
|default|string|--|默认间距|
|xxs|string|--|xxs 间距|
|xs|string|--|xs 间距|
|sm|string|--|sm 间距|
|md|string|--|md 间距|
|lg|string|--|lg 间距|
|xl|string|--|xl 间距|

## Font
|props|类型|默认值|描述|
|-----|----|----|----|
|font-size|string|--|默认字号|
|font-size-xs|string|--|xs 字号|
|font-size-sm|string|--|sm 字号|
|font-size-md|string|--|md 字号|
|font-size-lg|string|--|lg 字号|
|font-size-xl|string|--|xl 字号|
|font-size-xxl|string|--|xxl 字号|
|font-size-xxxl|string|--|xxxl 字号|
|leading|string|--|默认行高|
|leading-sm|string|--|sm 行高|
|leading-lg|string|--|lg 行高|
|leading-head-1|string|--|1号标题行高|
|leading-head-2|string|--|2号标题行高|
|leading-head-3|string|--|3号标题行高|
|leading-head-4|string|--|4号标题行高|
|leading-head-5|string|--|5号标题行高|

## Shadow
|props|类型|默认值|描述|
|-----|----|----|----|
|box-shadow-1|string|--|一级阴影|
|box-shadow-2|string|--|二级阴影|
|box-shadow-3|string|--|三级阴影|

## Radius
|props|类型|默认值|描述|
|-----|----|----|----|
|radius-base|string|--|基础圆角|
|radius-xs|string|--|xs 圆角|
|radius-sm|string|--|sm 圆角|
|radius-md|string|--|md 圆角|
|radius-lg|string|--|lg 圆角|
