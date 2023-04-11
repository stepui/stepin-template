const plugin = require('tailwindcss/plugin');
const stepinTheme = require('stepin/es/style/tailwind.config.cjs');

module.exports = {
  presets: [stepinTheme],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,less,css}', './docs/**/*.{vue,ts,jsx,tsx,less,css,md}'],
  darkMode: 'class', // or 'media' or 'class'
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
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
    require('@tailwindcss/container-queries'),
  ],
};
