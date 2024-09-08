<template>
  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <v-card class="tw-h-[5rem] tw-content-center" v-bind="props">
        <div
          class="tw-flex tw-cursor-pointer tw-place-content-between tw-items-center tw-px-4 tw-py-2"
        >
          <p class="tw-text-black dark:tw-text-white">
            {{ t(prop.menu.title) }}
          </p>
          <div class="tw-text-2xl">
            <v-icon
              class="tw-text-black tw-opacity-30 dark:tw-text-white"
              icon="mdi-chevron-right"
            />
          </div>
        </div>
      </v-card>
    </template>
    <v-list>
      <v-list-item
        v-for="n in prop.menu.items.length"
        :key="n"
        @click="
          navigate(prop.menu.items[n - 1].navigation);
          isOpen = false;
        "
      >
        {{ t(prop.menu.items[n - 1].title) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { navigate, useI18n } from "#imports";
import type { NavigationMenu } from "~/types/navigation";

interface Props {
  menu: NavigationMenu;
}

const prop = defineProps<Props>();
const { t } = useI18n();
const isOpen = defineModel("isOpen");
</script>

<style scoped></style>
