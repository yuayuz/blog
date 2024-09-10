<template>
  <v-btn
    class="tw-w-full tw-px-6 tw-py-2 hover:tw-text-[#B38A4A] dark:hover:tw-text-[#39525A]"
    variant="text"
  >
    <p class="tw-text-2xl">{{ t(props.menu.title) }}</p>
    <v-menu location="top end" activator="parent" open-on-hover>
      <div
        class="tw-h-fit tw-w-fit tw-space-y-2 tw-rounded-lg tw-bg-white tw-px-2 tw-py-2 tw-shadow dark:tw-bg-[#212121]"
      >
        <v-btn
          class="tw-w-full tw-border hover:tw-text-[#B38A4A] dark:hover:tw-text-[#E4AB4D]"
          variant="text"
          size="sm"
          density="comfortable"
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
