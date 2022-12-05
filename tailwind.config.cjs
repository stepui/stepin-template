const stepinTheme = require('stepin/es/theme/tailwind.stepin');
const plugin = require('tailwindcss/plugin');

module.exports = {
  presets: [stepinTheme],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  corePlugins: {
    preflight: false,
  },
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
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        xxl: '1536px',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, theme }) {
      const addMedia = (name, minWidth) => {
        const collapsedWidth = 160;
        addVariant(name, [
          `@media (min-width: ${minWidth}px)`,
          `@media (min-width: ${minWidth - collapsedWidth}px) {.collapsed &}`,
        ]);
      };
      const screens = Object.keys(theme('screens'));
      screens.forEach((name) => addMedia(`${name}x`, parseInt(theme(`screens.${name}`).replace('px', ''))));
    }),
    plugin(function ({ addVariant }) {
      addVariant('last-child', [`&:last-child`]);
      addVariant('first-child', [`&:first-child`]);
      addVariant('not-last-child', [`&:not(:last-child)`]);
      addVariant('not-first-child', [`&:not(:first-child)`]);
    }),
    require('@tailwindcss/container-queries'),
  ],
};
