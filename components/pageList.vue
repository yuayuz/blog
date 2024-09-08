<template>
  <div class="tw-mx-auto tw-w-5/6 tw-space-y-5">
    <v-card
      v-for="n in props.card.length"
      :key="n"
      class="px-3 tw-min-h-20 tw-content-center hover:tw-bg-pink-400"
      >{{ props.card[n - 1].title }}
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { PageListMessage } from "~/types/main";

interface Props {
  card: PageListMessage[];
}

const props = defineProps<Props>();
</script>

<style scoped></style>
