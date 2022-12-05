import { Plugin } from 'vue';
import IconFont from './IconFont.vue';

function createScriptUrlElements(scriptUrls: string[]) {
  scriptUrls.forEach((url) => {
    if (url.length > 0) {
      const script = document.createElement('script');
      script.setAttribute('src', url);
      script.setAttribute('data-namespace', url);
      document.body.appendChild(script);
    }
  });
}

const IconFontPlugin: Plugin = {
  install(app, options: { url: string | string[] }) {
    if (
      typeof document !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof document.createElement === 'function'
    ) {
      if (Array.isArray(options.url)) {
        createScriptUrlElements(options.url.reverse());
      } else {
        createScriptUrlElements([options.url]);
      }
    }
    app.component('IconFont', IconFont);
  },
};

export default IconFontPlugin;
