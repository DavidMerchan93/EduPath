/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:   '#1a4a6b',
          orange: '#e85d04',
          bg:     '#f5f5f5',
          text:   '#1a1a1a',
          star:   '#f59e0b',
          green:  '#22c55e',
          purple: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
