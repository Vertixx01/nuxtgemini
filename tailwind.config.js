/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'win11': {
          'bg': 'rgba(32, 32, 32, 0.85)',
          'sidebar': 'rgba(42, 42, 42, 0.9)',
          'hover': 'rgba(55, 55, 55, 0.9)',
        }
      },
      backdropBlur: {
        'md': '12px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}