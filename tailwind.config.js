/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-ssm': {'max': '260px'},
        'max-sm': { 'max': '639px' },
        'max-md': { 'max': '768px' },
        'max-lg': { 'max': '1023px' },
        'max-xl': { 'max': '1279px' },
      },
    },
  },
  plugins: [],
}