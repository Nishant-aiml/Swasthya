/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#1a1a1a',
        },
        primary: {
          DEFAULT: '#4f46e5',
          dark: '#6366f1',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-red-50',
    'bg-red-100',
    'text-red-600',
    'text-red-700',
    'border-red-100',
    'border-red-200',
    'bg-blue-50',
    'text-blue-600',
    'text-blue-700',
    'border-blue-100',
    'border-blue-200',
    'bg-purple-50',
    'text-purple-600',
    'text-purple-700',
    'border-purple-100',
    'border-purple-200',
    'bg-yellow-50',
    'text-yellow-600',
    'text-yellow-700',
    'border-yellow-100',
    'border-yellow-200',
  ],
}