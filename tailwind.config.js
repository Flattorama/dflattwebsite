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
        'accent': '#8082f8', // Purple from hero
        'accent-purple': '#8082f8', // From Project 1
      },
      keyframes: {
        jiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        }
      },
      animation: {
        jiggle: 'jiggle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
