const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: { max: "540px" },
        mobile: { max: "640px" },
      },
      colors: {
        principalAzul: "#008DEB",
        principalAzulTono1: "#0094F6",
        principalAzulTono2: "#0080D4",
        principalAzulTono3: "#006BB3",
        principalAzulTono4: "#005791",
        principalAzulTono5: "#00426F",
        dark: {
          bg: "#1a1a1a",
          text: "#e5e5e5",
          card: "#2a2a2a",
          border: "#3a3a3a",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "roboto-serif": ["Roboto Serif", "serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
