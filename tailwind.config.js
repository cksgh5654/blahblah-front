/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'max-768': { max: '768px' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
// tailwind.config.js
