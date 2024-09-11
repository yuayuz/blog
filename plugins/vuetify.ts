// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

import { colors } from "@/assets/colors";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            surface: colors.surface,
            background: colors.light_background,
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
