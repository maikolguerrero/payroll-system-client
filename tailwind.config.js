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
      colors: {
        principalAzul: '#008DEB',
        principalAzulTono2: '#0080D4',
        principalAzulTono5: '#00426F',
        white: '#ffffff', 
        black: '#000000',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

