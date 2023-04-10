# CSS 变量对照表
stepin 提供了 css、tailwindcss 和 less 变量。
## 主色和功能色
|css 变量|tailwindcss|less|
|--|--|--|
|--color-primary-1|primary-50|@primary-1|
|--color-primary-2|primary-100|@primary-2|
|...|...|...|
|--color-primary-10|primary-900|@primary-10|
|--color-primary-bg|primary-bg|@primary-bg|
|--color-primary-bg-hover|primary-bg-hover|@primary-bg-hover|
|--color-primary-border|primary-border|@primary-border|
|--color-primary-border-hover|primary-border-hover|@primary-border-hover|
|--color-primary-hover|primary-hover|@primary-hover|
|--color-primary-active|primary-active|@primary-active|
|--color-primary-text|primary-text|@primary-text|
|--color-primary-text-hover|primary-text-hover|@primary-text-hover|
|--color-primary-text-active|primary-text-active|@primary-active|
|--|--|--|
|--color-info-1|info-50|@info-1|
|...|...|...|
|--color-info-10|info-900|@info-10|
|--color-info-bg|info-bg|@info-bg|
|...|...|...|
|--color-info-text-active|info-text-active|@info-active|
|--|--|--|
|--color-success-1|success-50|@success-1|
|...|...|...|
|--color-success-10|success-900|@success-10|
|--color-success-bg|success-bg|@success-bg|
|...|...|...|
|--color-success-text-active|success-text-active|@success-active|
|--|--|--|
|--color-warning-1|warning-50|@warning-1|
|...|...|...|
|--color-warning-10|warning-900|@warning-10|
|--color-warning-bg|warning-bg|@warning-bg|
|...|...|...|
|--color-warning-text-active|warning-text-active|@warning-active|
|--|--|--|
|--color-error-1|error-50|@error-1|
|...|...|...|
|--color-error-10|error-900|@error-10|
|--color-error-bg|error-bg|@error-bg|
|...|...|...|
|--color-error-text-active|error-text-active|@error-active|

**用法示例**
* css
``` css
.link {
  color: var(--color-primary-text);
  background: var(--color-primary-bg);
  border: 1px solid var(--color-primary-border);
}
.link:hover {
  color: var(--color-primary-text-hover);
  background: var(--color-primary-bg-hover);
  border-color: var(--color-primary-border-hover);
}
```
* tailwindcss
``` html
<div class="text-primary-text bg-primary-bg hover:text-primary-text-hover hover:bg-primary-bg-hover border border-solid border-primary-border hover:border-primary-border-hover"></div>
```
* less
``` less
.link {
  color: @primary-text;
  background: @primary-bg;
  border: 1px solid @primary-border;
  &:hover {
    color: @primary-text-hover;
    background: @primary-bg-hover;
    border-color: @primary-border-hover;
  }
}
```

## 文本色及衍生色
|css 变量|tailwindcss|less|
|--|--|--|
|--color-text-1|text-1|@color-text-1|
|--color-text-2|text-2|@color-text-2|
|--color-text-3|text-3|@color-text-3|
|--color-text-4|text-4|@color-text-4|
|--color-subtext|subtext|@color-subtext|
|--color-text-inverse|text-inverse|@color-text-inverse|
|--color-border-1|border-1|@color-border-1|
|--color-border-2|border-2|@color-border-2|
|--color-border|border|@color-border|
|--color-fill-1|fill-1|@color-fill-1|
|--color-fill-2|fill-2|@color-fill-2|
|--color-fill-3|fill-3|@color-fill-3|
|--color-fill-4|fill-4|@color-fill-4|
|--color-disabled|disabled|@color-disabled|
|--color-shadow|shadow|@color-shadow|
|--color-shadow-light|shadow-light|@color-shadow-light|

**用法示例**
* css
``` css
.title {
  color: var(--color-text);
}
.subtitle {
  color: var(--color-subtext);
}
.box {
  background: var(--color-fill-1);
  border: 1px solid var(--color-border);
}
.box.disabled {
  background: var(--color-bg-disabled);
  border-color: var(--color-border-disabled);
}
```
* tailwindcss
``` html
<h1 class="text-text"></h1>
<h2 class="text-subtext"></h2>
<div class="bg-fill-1 border border-solid border-border disabled:border-border-disabled disabled:bg-disabled"></div>
```
* less
``` less
.title {
  color: @color-text;
}
.subtitle {
  color: @color-subtext;
}
.box {
  background: @color-fill-1;
  border: 1px solid @color-border;
  &:disabled {
    background: @color-bg-disabled;
    border-color: @color-border-disabled;
  }
}
```

## 背景色及衍生色
|css 变量|tailwindcss|less|
|--|--|--|
|--color-bg-layout|bg-layout|@bg-layout|
|--color-bg-container|bg-container|@bg-container|
|--color-bg-container-light|bg-container-light|@bg-container-light|
|--color-bg-popover|bg-popover|@bg-popover|
|--color-bg-spotlight|bg-spotlight|@bg-spotlight|
|--color-bg-mask|bg-mask|@bg-mask|
|--color-bg-hover|bg-hover|@bg-hover|
|--color-bg-active|bg-active|@bg-active|
|--color-bg-disabled|bg-disabled|@bg-disabled|
|--color-bg-side|bg-side|@bg-side|
|--color-bg-header|bg-header|@bg-header|
|--color-bg-menu|bg-menu|@bg-menu|
|--color-bg-submenu|bg-submenu|@bg-submenu|

**用法示例**
* css
``` css
.container {
  background: var(--color-bg-container);
}
.container:disabled {
  background: var(--color-bg-disabled);
}
```
* tailwindcss
``` html
<div class="bg-container disabled:bg-container"></div>
```
* less
``` less
.container {
  background: @bg-container;
  &:disabled {
    background: @bg-disabled;
  }
}
```

## 字体和行高
|css 变量|tailwindcss|less|
|--|--|--|
|--font-size|text-base|@font-base|
|--font-size-xs|text-xs|@font-xs|
|--font-size-sm|text-sm|@font-sm|
|--font-size-md|text-md|@font-md|
|--font-size-lg|text-lg|@font-lg|
|--font-size-xl|text-xl|@font-xl|
|--font-size-xxl|text-xxl|@font-xxl|
|--font-size-xxxl|text-xxxl|@font-xxxl|
|--leading|leading|@leading|
|--leading-sm|leading-sm|@leading-sm|
|--leading-lg|leading-lg|@leading-lg|
|--leading-head-1|leading-head-1|@leading-head-1|
|--leading-head-2|leading-head-2|@leading-head-2|
|--leading-head-3|leading-head-3|@leading-head-3|
|--leading-head-4|leading-head-4|@leading-head-4|
|--leading-head-5|leading-head-5|@leading-head-5|

## 外间距
|css 变量|tailwindcss|less|
|--|--|--|
|--margin|m-base|@margin|
|--margin-xxs|m-xxs|@margin-xxs|
|--margin-xs|m-xs|@margin-xs|
|--margin-sm|m-sm|@margin-sm|
|--margin-md|m-md|@margin-md|
|--margin-lg|m-lg|@margin-lg|
|--margin-xl|m-xl|@margin-xl|

## 内间距
|css 变量|tailwindcss|less|
|--|--|--|
|--padding|p-base|@padding|
|--padding-xxs|p-xxs|@padding-xxs|
|--padding-xs|p-xs|@padding-xs|
|--padding-sm|p-sm|@padding-sm|
|--padding-md|p-md|@padding-md|
|--padding-lg|p-lg|@padding-lg|
|--padding-xl|p-xl|@padding-xl|

## 其它
|css 变量|tailwindcss|less|
|--|--|--|
|--width-side|w-side|@width-side|
|--width-side-collapsed|w-side-collapsed|@width-side-collapsed|
|--height-header|h-header|@height-header|
|--height-footer|h-footer|@height-footer|