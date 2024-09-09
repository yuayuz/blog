<template>
  <v-menu v-model="open">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <template v-slot:prepend>
          <v-img :src="svg_language" />
        </template>
        {{ locale === "en" ? "English" : "简体中文" }}
        <template v-slot:append>
          <v-icon :icon="open ? ' mdi-chevron-up' : ' mdi-chevron-down'" />
        </template>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="setLocale('en')">English</v-list-item>
      <v-list-item @click="setLocale('zhHans')">简体中文</v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import svg_language from "@/public/navigation/svg_language.svg";

const { locale, setLocale } = useI18n();
const open = ref(false);
</script>

<style scoped>
@import "@/stylus/button.css";
</style>
