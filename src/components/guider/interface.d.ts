import { ComponentPublicInstance, FunctionalComponent, AsyncComponentOptions, AsyncComponentLoader } from 'vue';

export type GuideTarget = HTMLElement | ComponentPublicInstance | String;
export type GuiderOption = {
  target?: GuideTarget;
  doc?: GuideTarget | FunctionalComponent | AsyncComponentOptions | AsyncComponentLoader;
};
