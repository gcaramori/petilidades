/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#F5F0F0',
        grayBorder: '#ABA6A6',
        mainGreen: '#7bba79',
        mainPink: '#fdc0cc',
      },
    },
  },
  plugins: [],
}
