/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2400px",
    },
    fontFamily: {
      plex: ["IBM Plex Sans KR, sans-serif"],
      alfa: ["Alfa Slab one, display"],
    },
    transitionTimingFunction: {
      func1: "cubic-bezier(.8,.05,.2,.95)",
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
