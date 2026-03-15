/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#e63946', dark: '#c1121f', light: '#fef2f2' }
      }
    }
  },
  plugins: []
}
