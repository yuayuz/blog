import { colors } from "./assets/colors.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      screens: {
        md: "960px", // tailwindcss 与 Vuetify 的 screens 尺寸不一致,将 tailwind 的 md 改为 960px
      },
      colors: {
        pictureTone: colors.pictureTone,
        pictureTone_deep: colors.pictureTone_deep,
        surface: colors.surface,
        surface_dark: colors.surface_dark,
        light_background: colors.light_background,
      },
    },
  },
  plugins: [],
  prefix: "tw-",
  darkMode: "selector",
};
