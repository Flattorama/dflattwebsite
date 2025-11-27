/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        display: ['Bueno', 'Haettenschweiler', 'Impact', 'sans-serif'],
      },
      colors: {
        'theme-bg': '#FFF8F0', // Cream
        'card-bg': '#EAEBE6',
        'accent-purple': '#8082f8', // From Project 1
      }
    },
  },
  plugins: [],
}
