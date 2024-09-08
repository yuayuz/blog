<template>
  <div class="tw-mx-auto tw-w-11/12 tw-space-y-5">
    <v-card
      v-for="n in props.card.length"
      :key="n"
      class="px-3 tw-min-h-20 tw-content-center hover:tw-bg-pink-400"
      @click="navigate(`${props.currentPath}/${props.card[n - 1].title}`)"
    >
      <div class="tw-flex tw-justify-between">
        <div class="tw-w-fit tw-text-2xl">{{ props.card[n - 1].title }}</div>
        <div class="tw-w-fit tw-text-base tw-opacity-40">
          {{ props.card[n - 1].date }}
        </div>
      </div>
      <div class="tw-text-base">{{ props.card[n - 1].subMessage }}</div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { PageListProps } from "~/types/navigation";
import { navigate } from "~/utils/navigation";

const props = defineProps<PageListProps>();
</script>

<style scoped></style>
