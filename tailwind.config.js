/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14B8A6', // Teal color
        'primary-dark': '#0F766E', // Dark teal
        'primary-light': '#5EEAD4', // Light teal
        secondary: '#10B981', // Emerald color, you can change this
      },
      borderColor: {
        border: '#E5E7EB', // This defines the border color
      },
    },
  },
  plugins: [],
}