/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pressStart': ["press-start", "sans-serif"],
      },
    },
  },
  plugins: [],
}