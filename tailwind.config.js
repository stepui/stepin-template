const stepinTheme = require('stepin/es/theme/tailwind.stepin');
const plugin = require('tailwindcss/plugin');

const extendDevice = ['smx', 'mdx', 'lgx', 'xlx', 'xxlx'];

module.exports = {
  presets: [stepinTheme],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxl: '1.75rem',
      },
      padding: {
        xs: '0.125rem',
      },
      margin: {
        xs: '0.125rem',
      },
      screens: (theme) => {
        return {
          sm: '480px',
          md: '768px',
          lg: '976px',
          xl: '1440px',
          xxl: '1536px',
        };
      },
    },
  },
  variants: {
    extend: {
      gridColumn: extendDevice,
    },
  },
  plugins: [
    plugin(function ({ addVariant, postcss, theme }) {
      const addMedia = (name, minWidth) => {
        addVariant(name, ({ container }) => {
          const collapsedWidth = 160;
          const mediaRule = postcss.atRule({
            name: 'media',
            params: `(min-width: ${minWidth}px)`,
          });
          const collapsedRule = postcss.atRule({
            name: 'media',
            params: `(min-width: ${minWidth - collapsedWidth}px)`,
          });
          mediaRule.append(container.nodes);
          container.push(mediaRule);
          container.push(collapsedRule);
          mediaRule.walkRules((rule) => {
            rule.selector = `.${name}\\:${rule.selector.slice(1)}`;
            collapsedRule.append(rule.clone());
          });
          collapsedRule.walkRules((rule) => {
            rule.selector = `.collapsed ${rule.selector}`;
          });
        });
      };

      extendDevice.forEach((name) =>
        addMedia(
          name,
          parseInt(
            theme(`screens.${name.slice(0, name.length - 1)}`).replace('px', '')
          )
        )
      );
    }),
  ],
};
