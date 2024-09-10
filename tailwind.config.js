/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      screens: {
        md: "960px", // tailwindcss 与 Vuetify 的 screens 尺寸不一致,将 tailwind 的 md 改为 960px
      },
      colors: {
        pictureTone: "#D99438",
        pictureTone_deep: "#39525A",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
  darkMode: "selector",
};
