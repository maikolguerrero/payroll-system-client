const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '540px' },
        'mobile': { 'max': '640px' },
      },
      colors: {
        principalAzul: '#008DEB',
        principalAzulTono1: '#0094F6',
        principalAzulTono2: '#0080D4',
        principalAzulTono3: '#006BB3',
        principalAzulTono4: '#005791',
        principalAzulTono5: '#00426F',
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'roboto-serif': ['Roboto Serif', 'serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
