import { Component, DefineComponent } from 'vue';

type LazyComponent = () => Promise<Component | DefineComponent>;
const modules: Record<string, LazyComponent> = import.meta.glob('./**/*.{ts,vue,tsx}');

type DynamicModule = { [key: string]: LazyComponent };

const Pages = Object.entries(modules).reduce((r, [key, _module]) => {
  key = key.replace(/^.\//, '@/pages/');
  r[key] = _module;
  if (/\/index.(js|ts|tsx|vue)/.test(key)) {
    r[key.replace(/\/index.(js|ts|tsx|vue)/, '')] = _module;
  }
  return r;
}, {} as DynamicModule);

export default Pages;
