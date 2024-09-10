// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            surface: "#fefcfa",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
