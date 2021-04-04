const stepinTheme = require('stepin/es/theme/tailwind.stepin');

module.exports = {
  presets: [stepinTheme],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
