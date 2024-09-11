<template>
  <v-btn
    class="tw-w-full tw-px-6 tw-py-2 hover:tw-text-pictureTone dark:hover:tw-text-pictureTone_deep"
    variant="text"
  >
    <p class="tw-text-2xl">{{ t(props.menu.title) }}</p>
    <v-menu location="end" activator="parent" open-on-hover>
      <div
        class="tw-bg-surface dark:tw-bg-surface_dark tw-h-fit tw-w-fit tw-space-y-2 tw-rounded-lg tw-px-2 tw-py-2 tw-shadow"
      >
        <v-btn
          class="tw-w-full tw-border hover:tw-text-pictureTone dark:hover:tw-text-pictureTone"
          variant="text"
          size="large"
          v-for="n in props.menu.items.length"
          :key="n"
          @click="navigate(props.menu.items[n - 1].navigation)"
        >
          <p class="tw-text-base">{{ t(props.menu.items[n - 1].title) }}</p>
        </v-btn>
      </div>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import { navigate, useI18n } from "#imports";
import type { NavigationMenu } from "~/types/navigation";

interface Props {
  menu: NavigationMenu;
}

const props = defineProps<Props>();
const { t } = useI18n();
</script>

<style scoped></style>
