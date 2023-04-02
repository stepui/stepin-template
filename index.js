const src = ` <stepin-view
system-name="Stepin"
logo-src="@/assets/vite.svg"
:class="\`\${contentClass}\`"
:user="user"
:navMode="navigation"
:useTabs="useTabs"
:themeList="themeList"
v-model:show-setting="showSetting"
v-model:theme="theme"
v-auth="(theme: string) => 
configTheme(theme)
"
@themeSelect="(theme: string) => configTheme(theme)"
>
<template #headerActions>
  <HeaderActions @showSetting="showSetting = true" />
</template>
<template #pageFooter>
  <PageFooter />
</template>
<template #themeEditorTab>
  <a-tab-pane tab="其它" key="other">
    <Setting />
  </a-tab-pane>
</template>
</stepin-view>
<login-modal :unless="['/login']" />`;

const content = src
  .replace(/(?<=((@|:|v-)[\w\-]*="))([\s\S]*)(?=")/g, function (match) {
    return `${tsToJs(match).replace(/;\s*/g, '')}`;
  })
  .replace(/(?<=({{))([\s\S]*)(?=}})/g, function (match) {
    return `${tsToJs(match).replace(/;\s*$/, '')}`;
  });
// const flag = /(?<=(\<template>))([\w\W]*)(?=(\<\/template>))/.test(src);
console.log(content);
