/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-teal': '#00879e',
        'primary-teal-light': '#e6f7f9',
      },
    },
  },
  plugins: [],
}
