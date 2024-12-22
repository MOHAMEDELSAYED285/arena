/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'arena-orange': '#FFA50B',
          'arena-yellow': '#FFD700',
        },
        fontFamily: {
          'oswald': ['Oswald', 'sans-serif'],
          'open-sans': ['Open Sans', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }